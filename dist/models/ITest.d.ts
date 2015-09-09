declare module models {
    interface ITest {
        methodName: string;
        description: string;
        isAsync: boolean;
        id?: string;
        parameters?: any[];
    }
}
