declare module "type-unit" {
	export var Suite: (description: string) => (target: any) => void;
    export var Fact: (description: string, id?: string) => (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => void;
    export var Theory: (description: string, parameters: any[][]) => (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => void;
}