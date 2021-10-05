export class Url {
    private params: URLSearchParams;

    constructor(init: string) {
        this.params = new URLSearchParams(init);
    }

    public get = (name: string, df: any = ''): string => {
        const value = this.params.get(name);

        return value ?? df;
    }

    public set = (name: string, value: string | number): void => {
        this.params.set(name, value.toString());
    }
}