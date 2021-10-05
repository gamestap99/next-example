import {Breadcrumb} from "../core/Breadcrumb";
import {Document} from "../core/Document";

export class Global {
    static Token: string = '';
    static Document: Document = new Document();
    static Breadcrumb: Breadcrumb = new Breadcrumb();
}