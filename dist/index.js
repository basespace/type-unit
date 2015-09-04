/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="models/ITest.ts" />
/// <reference path="../node_modules/reflect-metadata/reflect-metadata.d.ts" />
var suite = require("./decorators/suite");
var fact = require("./decorators/fact");
var theory = require("./decorators/theory");
module.exports = {
    Suite: suite,
    Fact: fact,
    Theory: theory
};
//# sourceMappingURL=index.js.map