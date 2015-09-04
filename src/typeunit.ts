/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="models/ITest.ts" />
/// <reference path="../node_modules/reflect-metadata/reflect-metadata.d.ts" />

exports = {
	suite : require("decorators/suite"),
	fact : require("decorators/fact"),
	theory : require("decorators/theory")	
};