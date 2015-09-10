// @Fact decorator
require("reflect-metadata");
module.exports = function (description) {
    return function (target, propertyKey, descriptor) {
        var tests = Reflect.getMetadata("typeunit.tests", target.constructor);
        var newTest = {
            methodName: propertyKey,
            description: description,
            isAsync: false
        };
        var testSource = target[propertyKey].toString();
        if (tests) {
            tests.push(newTest);
        }
        else {
            tests = [newTest];
        }
        Reflect.defineMetadata("typeunit.tests", tests, target.constructor);
    };
};
//# sourceMappingURL=fact.js.map