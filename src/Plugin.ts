export interface Plugin {
    test(method: Function, params: any, description: string): Function;
    suite(instance: any, factsToInvoke: Function[], description: string): Function;
}