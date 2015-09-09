// @Suite decorator

require("reflect-metadata");

export = (description: string) => {
    return function (target: any) {
        var testsToRun: models.ITest[] = Reflect.getMetadata("typeunit.tests", target);

        var suite = new target();

        describe(description, function () {
            testsToRun.forEach(function (test: models.ITest) {
                if (Array.isArray(test.parameters)) {
                    var i = 0;
                    test.parameters.forEach(function (params: any[]) {
                        if (test.isAsync) {
                            it(i + ": " + test.description + params.toString(), function (done) {
                                suite[test.methodName].apply(suite, params.concat(done));
                            });
                        } else {
                            it(i + ": " + test.description + params.toString(), function () {
                                suite[test.methodName].apply(suite, params);
                            });
                        }
                        i++;
                    });
                } else {
                    if (test.isAsync) {
                        it(test.description, function (done) {
                            suite[test.methodName](done);
                        });
                    } else {
                        it(test.description, function () {
                            suite[test.methodName]();
                        });
                    }
                }
            });
        });
    };
};