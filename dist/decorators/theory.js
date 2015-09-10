/// @Theory decorator
require("reflect-metadata");
module.exports = function (description, parameters) {
    return function (target, propertyKey, descriptor) {
        var tests = Reflect.getMetadata("typeunit.tests", target.constructor);
        var newTest = {
            methodName: propertyKey,
            description: description,
            parameters: parameters
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
//# sourceMappingURL=theory.js.map