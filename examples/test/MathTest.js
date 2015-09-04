var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var typeunit = require("../../dist/index");
var assert = require("assert");
var Suite = typeunit.Suite, Fact = typeunit.Fact, Theory = typeunit.Theory;
require("mocha");
var MathTests = (function () {
    function MathTests() {
    }
    MathTests.prototype.addition = function () {
        assert.equal(1 + 1, 2, "One plus one equals two");
    };
    MathTests.prototype.subtraction = function () {
        assert.equal(1 - 1, 2, "One minus one does not equal two");
    };
    Object.defineProperty(MathTests.prototype, "addition",
        __decorate([
            Fact("Addition -- should pass"), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', []), 
            __metadata('design:returntype', Object)
        ], MathTests.prototype, "addition", Object.getOwnPropertyDescriptor(MathTests.prototype, "addition")));
    Object.defineProperty(MathTests.prototype, "subtraction",
        __decorate([
            Fact("Subtraction -- should fail"), 
            __metadata('design:type', Function), 
            __metadata('design:paramtypes', []), 
            __metadata('design:returntype', Object)
        ], MathTests.prototype, "subtraction", Object.getOwnPropertyDescriptor(MathTests.prototype, "subtraction")));
    MathTests = __decorate([
        Suite("Math tests"), 
        __metadata('design:paramtypes', [])
    ], MathTests);
    return MathTests;
})();
//# sourceMappingURL=MathTest.js.map