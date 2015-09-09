declare module "type-unit" {
	export var Suite: (description: string) => (target: any) => void;
    export var Fact: (description: string, isAsync?: boolean) => (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => void;
    export var Theory: (description: string, parameters: any[][], isAsync?: boolean) => (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => void;
}