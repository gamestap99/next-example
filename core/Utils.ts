import {App} from "../const/App";
import {forIn} from "lodash";
import moment from "moment";

export class Utils {
    public static isDev = (): boolean => {
        return !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    }

    public static getOSName = () => {
        return "Web";
    };

    public static getVersion = (): string => {
        return navigator.appVersion;
    };

    public static getNPT = (): string => {
        return "";
    };

    public static copyClipboard = async (str: string) => {
        await navigator.clipboard.writeText(str)
    }

    public static boolToInt = (bool: boolean): number => {
        return bool ? 1 : 0;
    }

    public static intToBool = (value: string | number): boolean => {
        return value.toString() === '1';
    }

    public static debounce = <F extends ((...args: any) => any)>(func: F, waitFor: number) => {
        let timeout: number = 0

        const debounced = (...args: any) => {
            clearTimeout(timeout)
            setTimeout(() => func(...args), waitFor)
        }

        return debounced as (...args: Parameters<F>) => ReturnType<F>
    }

    public static clearEmptyUrl = (data: any) => {
        if (typeof data !== "object") {
            return data;
        }

        const newData: any = {};

        forIn(data, (value: any, key: string) => {
            if (value !== undefined && value.toString().length > 0) {
                newData[key] = value;
            }
        });

        return newData;
    }

    public static strSlug = (str: string): string => {
        let filter = str.toLowerCase();

        filter = filter.replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, "a");
        filter = filter.replace(/[èéẹẻẽêềếệểễ]/g, "e");
        filter = filter.replace(/[ìíịỉĩ]/g, "i");
        filter = filter.replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, "o");
        filter = filter.replace(/[ùúụủũưừứựửữ]/g, "u");
        filter = filter.replace(/[ỳýỵỷỹ]/g, "y");
        filter = filter.replace(/đ/g, "d");
        filter = filter.replace(/ & /g, "-")
        filter = filter.replace(/-&-/g, "-");
        // filter = filter.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
        filter = filter.replace(/!|@|%|\^|\*|\(|\)|\+|=|<|>|\?|\/|,|\.|:|;|'| |"|&|#|\[|]|~|$|_/g, "-");

        filter = filter.replace(/-+-/g, "-");
        // filter = filter.replace(/^\-+|\-+$/g, "");
        filter = filter.replace(/^-+|-+$/g, "");

        return filter;
    }

    public static dataURLtoBlob(dataUrl: any) {
        const arr = dataUrl.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bStr = atob(arr[1]);
        let n = bStr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bStr.charCodeAt(n);
        }

        return new Blob([u8arr], {type: mime});
    };

    public static checkError = (e: any) => {
        console.warn(e.constructor, e.name, e.message, e.stack);
    };

    public static cdnScAsset = (path: string): string => {
        return App.UrlCdnSc + `/${path}`;
    }

    public static checkHourState(timestamp: number, expired: number = App.HoursStoreState) {
        return moment().diff(moment.unix(timestamp), 'hours') > expired;
    }

    public static htmlDecode(msg: string) {
        const e = document.createElement('div');
        e.innerHTML = msg;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue ?? '';
    }
}
