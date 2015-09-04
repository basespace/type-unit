// @Fact decorator

exports = (description: string, id?: string) => {
    return function (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) {
        var tests = Reflect.getMetadata("typeunit.tests", target.constructor);

        var newTest: models.ITest = {
            methodName: propertyKey,
            description: description
        };

        if (tests) {
            tests.push(newTest);
        } else {
            tests = [newTest];
        }

        Reflect.defineMetadata("typeunit.tests", tests, target.constructor);
    }
};;