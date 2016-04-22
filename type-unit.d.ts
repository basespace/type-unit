declare module "type-unit" {
    export function fact(description?: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
    export function theory(datasets: any[][], description?: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
    export function suite(description?: string): (target: any) => void;
}