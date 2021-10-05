import {ListGridType} from "antd/lib/list";
import {MediaQueryOption} from "../core/MediaQuery";

export class Style {
    static readonly GridOnlyOne: ListGridType = {
        xs: 1,
        sm: 1,
        md: 1,
        lg: 1,
        xl: 1,
        xxl: 1,
    }

    static readonly GridTypeMain: ListGridType = {
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 4,
        xxl: 5,
    }

    static readonly GridTypeHome: ListGridType = {
        // @ts-ignore
        gutter: [16 * 4, 16],
        xs: 2,
        sm: 3,
        md: 4,
        lg: 4,
        xl: 4,
        xxl: 4,
    }

    static readonly GridLimit: MediaQueryOption = {
        xs: 6,
        sm: 6,
        md: 12,
        lg: 12,
        xl: 12,
        xxl: 15,
    }

    static readonly GridLoadingAnimation: MediaQueryOption = {
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 4,
        xxl: 5,
    }

    static readonly GridLimitBlog: MediaQueryOption = {
        xs: 4,
        sm: 4,
        md: 6,
        lg: 8,
        xl: 8,
        xxl: 8,
    }

    static readonly GridTypeBlog: ListGridType = {
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 4,
        xxl: 4,
    }

    static readonly GridTypeBlogPost: ListGridType = {
        xs: 2,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 4,
        xxl: 4,
    }
}
