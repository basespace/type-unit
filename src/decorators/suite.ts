// @Suite decorator

require("reflect-metadata");

function isTestFunctionAsync(fn: Function, parameters: any[]) {
    var fnString = fn.toString();
    
    var paramsPassed = Array.isArray(parameters) ? parameters.length : 0;
    
    var paramsInSignature = getNumParams(fnString);
    
    if (paramsInSignature > paramsPassed) {
        return true;
    } else {
        return false;
    }
}

function getNumParams(fnString: string): number {
    var regex = /^function(\s?)\((.+)\)(\s?)\{/i;
    
    var result = regex.exec(fnString);
    
    if (result) {
        var params = result[2];
        
        if (params) {
           return params.split(",").length;    
        }
    }
    
    return 0;
}


export = (description: string) => {
    return function (target: any) {
        var testsToRun: models.ITest[] = Reflect.getMetadata("typeunit.tests", target);

        var suite = new target();

        describe(description, function () {
            testsToRun.forEach(function (test: models.ITest) {
                var isAsync = isTestFunctionAsync(suite[test.methodName], test.parameters);
                if (Array.isArray(test.parameters)) {
                    var i = 0;
                    test.parameters.forEach(function (params: any[]) {
                        if (isAsync) {
                            it(i + ": " + test.description + params.toString(), function (done) {
                                return suite[test.methodName].apply(suite, params.concat(done));
                            });
                        } else {
                            it(i + ": " + test.description + params.toString(), function () {
                                return suite[test.methodName].apply(suite, params);
                            });
                        }
                        i++;
                    });
                } else {
                    if (isAsync) {
                        it(test.description, function (done) {
                            return suite[test.methodName](done);
                        });
                    } else {
                        it(test.description, function () {
                            return suite[test.methodName]();
                        });
                    }
                }
            });
        });
    };
};