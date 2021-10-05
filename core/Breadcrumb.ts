interface Option {
    text: string;
    href: string;
    icon: string;
}

export class Breadcrumb {
    data: Option[] = [];

    public add(text: string, href: string = '', icon: string = ''): void {
        this.data.push({
            text: text,
            href: href,
            icon: icon,
        });
    }

    public get(): Option[] {
        return this.data;
    }

    public clear(): void {
        this.data = [];
    }
}