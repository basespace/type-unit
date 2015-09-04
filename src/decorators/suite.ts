// @Suite decorator

exports = (description: string) => {
    return function (target: any) {
        var testsToRun: models.ITest[] = Reflect.getMetadata("typeunit.tests", target);

        describe(description, function () {
            testsToRun.forEach(function (test: models.ITest) {
                if (Array.isArray(test.parameters)) {
                    var i = 0;
                    test.parameters.forEach(function (params: any[]) {
                        it(i + ": " + test.description + params.toString(), function () {
                            var suite = new target();
                            suite[test.methodName].apply(suite, params);
                        });
                        i++;
                    });
                } else {
                    it(test.description, function () {
                        var suite = new target();
                        suite[test.methodName]();
                    });
                }
            });
        });
    };
};