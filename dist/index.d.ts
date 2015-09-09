/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="models/ITest.d.ts" />
/// <reference path="../node_modules/reflect-metadata/reflect-metadata.d.ts" />
declare var _default: {
    Suite: (description: string) => (target: any) => void;
    Fact: (description: string, isAsync?: boolean) => (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => void;
    Theory: (description: string, parameters: any[][], isAsync?: boolean) => (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => void;
};
export = _default;
