// @Fact decorator
require("reflect-metadata");
module.exports = function (description, id) {
    return function (target, propertyKey, descriptor) {
        var tests = Reflect.getMetadata("typeunit.tests", target.constructor);
        var newTest = {
            methodName: propertyKey,
            description: description
        };
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