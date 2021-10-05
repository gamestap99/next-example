export class Document {
    title: string = '';
    description: string = '';

    public setTitle(text: string): void {
        this.title = text;
    }

    public getTitle(): string {
        return this.title;
    }

    public setDescription(text: string): void {
        this.description = text;
    }

    public getDescription(): string {
        return this.description;
    }
}