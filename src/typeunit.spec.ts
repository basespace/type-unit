/// <reference path="../typings/mocha/mocha.d.ts" />

var expect = require("expect");
import {fact, suite, theory} from "./index";

describe("type-unit", () => {
    describe("@fact", () => {
        let factWasCalled: boolean;
        let nonFactWasCalled: boolean;
        beforeEach(() => {
            factWasCalled = false;
            nonFactWasCalled = false;
            
            @suite()
            class TestClass {
                
                @fact()
                myFact() {
                    factWasCalled = true;
                }
                
                myNonFact() {
                    nonFactWasCalled = true;
                }
            }
        });
        
        it("should have called the method decorated by @fact", () => {
            expect(factWasCalled).toBe(true);
        });
        
        it ("should not have called the method not decorated by @fact", () => {
            expect(nonFactWasCalled).toBe(false);
        });
    });
    
    describe("@theory", () => {
        let num: number;
        let str: string;
        
        beforeEach(() => {
            num = 0;
            str = "";
            @suite()
            class TestClass {
                @theory([[1, "a"], [2, "b"], [3, "c"], [4, "d"], [5, "e"]])
                myFact(currentNumber: number, currentLetter: string) {
                    num += currentNumber;
                    str += currentLetter;
                }
            }
        });
        
        it("should pass the first argument on each invocation", () => {
            expect(num).toBe(15);
        });
        
        it ("should pass the second argument on each invocation", () => {
            expect(str).toBe("abcde");
        });
    });
});