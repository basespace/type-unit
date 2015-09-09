// @Suite decorator
require("reflect-metadata");
module.exports = function (description) {
    return function (target) {
        var testsToRun = Reflect.getMetadata("typeunit.tests", target);
        var suite = new target();
        describe(description, function () {
            testsToRun.forEach(function (test) {
                if (Array.isArray(test.parameters)) {
                    var i = 0;
                    test.parameters.forEach(function (params) {
                        if (test.isAsync) {
                            it(i + ": " + test.description + params.toString(), function (done) {
                                suite[test.methodName].apply(suite, params.concat(done));
                            });
                        }
                        else {
                            it(i + ": " + test.description + params.toString(), function () {
                                suite[test.methodName].apply(suite, params);
                            });
                        }
                        i++;
                    });
                }
                else {
                    if (test.isAsync) {
                        it(test.description, function (done) {
                            suite[test.methodName](done);
                        });
                    }
                    else {
                        it(test.description, function () {
                            suite[test.methodName]();
                        });
                    }
                }
            });
        });
    };
};
//# sourceMappingURL=suite.js.map