/// <reference path="../typings/node/node.d.ts" />


import "reflect-metadata";
import {Theory} from "./Theory";
import {Fact} from "./Fact";
import {TypeUnitConfig} from "./TypeUnitConfig";
import * as path from "path";
import * as fs from "fs";
let configFile = path.join(process.cwd(), "typeunit.config");
export let config: TypeUnitConfig = require(configFile);

let FACT_METADATA_KEY = "type-unit:facts";
let THEORY_METADATA_KEY = "type-unit:theories";

/**
 * @fact decorator, used on the test methods of a Class suite
 */
export let fact = (description?: string) =>
	(target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
		let facts: Fact[] = Reflect.getMetadata(FACT_METADATA_KEY, target);
		
		/**
		 * If this is the first @fact encountered for the given class,
		 * initialize the facts array and associate it with the constructor
		 * or prototype using Reflect metadata.
		 */
		if (!facts) {
			facts = [];
			Reflect.defineMetadata(FACT_METADATA_KEY, facts, target);
		}
		
		/**
		 * Add the @fact function itself to the array.
		 * It will be invoked with the correct "this" parameter
		 * by the @suite.
		 */
		
		let fact: Fact = {
			fn: target[propertyKey],
			description: description
		};
		
		facts.push(fact);
	};
	
/**
 * @theory decorator, used on the data-dependent test methods of a Class suite
 */
export let theory = (datasets: any[][], description?: string) => 
	(target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
				
		let theories: Theory[] = Reflect.getMetadata(THEORY_METADATA_KEY, target);
		
		/**
		 * If this is the first @theory encountered for the given class,
		 * initialize the theories array and associate it with the constructor
		 * or prototype using Reflect metadata.
		 */
		
		if (!theories) {
			theories = [];
			Reflect.defineMetadata(THEORY_METADATA_KEY, theories, target);
		}
		
		let theory: Theory = {
			fn: target[propertyKey],
			datasets: datasets,
			description: description
		};
		
		theories.push(theory);
	};

/**
 * @suite decorator, used on Classes
*/
export let suite = (description?: string) => 
	(target: any) => {
		/**
		 * Whereas instance test methods will be associated with the method's
		 * prototype, static test methods will be associated with the 
		 * constructor itself; see
		 * https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Decorators.md#method-decorators
		 */
		let staticFacts: Fact[] = Reflect.getMetadata(FACT_METADATA_KEY, target);
		let instanceFacts: Fact[] = Reflect.getMetadata(FACT_METADATA_KEY, target.prototype);
		let staticTheories: Theory[] = Reflect.getMetadata(THEORY_METADATA_KEY, target);
		let instanceTheories: Theory[] = Reflect.getMetadata(THEORY_METADATA_KEY, target.prototype);
				
		let testsToInvoke: Function[] = [];

		/**
		 * Set up @fact static method invocations.
		 */
		if (staticFacts) {
			for (let i = 0; i < staticFacts.length; i++) {
				let suiteInstance = new target();
				let staticFact = staticFacts[i];
				testsToInvoke.push(() => invokeTest(staticFact.fn, global, staticFact.description));
			}
		}

		/**
		 * Set up @fact instance method invocations.
		 */
		if (instanceFacts) {
			for (let i = 0; i < instanceFacts.length; i++) {
				let suiteInstance = new target();
				let instanceFact = instanceFacts[i];
				testsToInvoke.push(() => invokeTest(instanceFact.fn, suiteInstance, instanceFact.description));
			}
		}
		
		if (staticTheories) {
			for (let i = 0; i < staticTheories.length; i++) {
				let staticTheory = staticTheories[i];
				for (let j = 0; j < staticTheory.datasets.length; j++) {
					let dataset = staticTheory.datasets[j];
					testsToInvoke.push(() => invokeTest(staticTheory.fn, global, staticTheory.description, dataset));
				}
			}
		}
		
		if (instanceTheories) {
			for (let i = 0; i < instanceTheories.length; i++) {
				let suiteInstance = new target();
				let instanceTheory = instanceTheories[i];
				
				for (let j = 0; j < instanceTheory.datasets.length; j++) {
					let dataset = instanceTheory.datasets[j];
					testsToInvoke.push(() => invokeTest(instanceTheory.fn, suiteInstance, instanceTheory.description, dataset));
				}
			}
		}
		runSuite(target, description, testsToInvoke);
	};
/**
 * Used to invoke the tests of a suite; used inside functions declared in the @suiteDecorator; invoked by runSuite()
 */
let invokeTest = (test: Function, thisContext: any, description: string, params?: any[]) => {
	let fn = () => {
		test.apply(thisContext, params);
	};
	
	if (config.plugin && config.plugin.test) {
		config.plugin.test(fn, params, description);
	} else {
		fn();
	}
};

/**
 * Used to invoke all the tests of the given suite; called by the @suiteDecorator
 */
let runSuite = (suiteInstance: any, description: string, testsToInvoke: Function[]) => {
	
	let isPluginPresent = config.plugin && config.plugin.suite;
	
	if (isPluginPresent) {
		config.plugin.suite(suiteInstance, testsToInvoke, description);
	} else {
		for (let i = 0; i < testsToInvoke.length; i++) {
			let test = testsToInvoke[i];
			test();
		}
	}
};