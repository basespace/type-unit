/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="models/ITest.ts" />
/// <reference path="../node_modules/reflect-metadata/reflect-metadata.d.ts" />
/// <reference path="../typings/bluebird/bluebird.d.ts" />

import suite = require("./decorators/suite");
import fact = require("./decorators/fact");
import theory = require("./decorators/theory");

export = {
	Suite : suite,
	Fact : fact,
	Theory : theory	
};