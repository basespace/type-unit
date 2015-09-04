// @Suite decorator
module.exports = function (description) {
    return function (target) {
        var testsToRun = Reflect.getMetadata("typeunit.tests", target);
        describe(description, function () {
            testsToRun.forEach(function (test) {
                if (Array.isArray(test.parameters)) {
                    var i = 0;
                    test.parameters.forEach(function (params) {
                        it(i + ": " + test.description + params.toString(), function () {
                            var suite = new target();
                            suite[test.methodName].apply(suite, params);
                        });
                        i++;
                    });
                }
                else {
                    it(test.description, function () {
                        var suite = new target();
                        suite[test.methodName]();
                    });
                }
            });
        });
    };
};
//# sourceMappingURL=suite.js.map