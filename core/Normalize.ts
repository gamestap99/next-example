export class Normalize {
    static initJsonObject(json: Record<string, any>, key: string, fn?: Function): any | undefined {
        return json.hasOwnProperty(key) && json[key].constructor === Object && Object.keys(json[key]).length > 0
            ? fn === undefined
                ? json[key]
                : fn(json[key])
            : undefined
    }

    static initJsonArray(json: Record<string, any>, key: string, fn?: Function): any[] | undefined {
        return json.hasOwnProperty(key) && json[key] instanceof Array && json[key].length > 0
            ? fn === undefined
                ? json[key]
                : fn(json[key])
            : undefined
    }

    static initJsonString(json: Record<string, any>, key: string, fn?: Function): string | undefined {
        return json.hasOwnProperty(key) && (typeof json[key] === "string" || typeof json[key] === "number") && json[key].toString().length > 0
            ? fn === undefined
                ? typeof json[key] === "number"
                    ? json[key].toString()
                    : json[key]
                : fn(json[key])
            : undefined
    }

    static initJsonNumber(json: Record<string, any>, key: string, fn?: Function): number | undefined {
        return json.hasOwnProperty(key) && (typeof json[key] === "string" || typeof json[key] === "number") && json[key].toString().length > 0
            ? fn === undefined
                ? typeof json[key] === "string"
                    ? json[key].indexOf('.') !== -1 ? parseFloat(json[key]) : parseInt(json[key])
                    : json[key]
                : fn(json[key])
            : undefined
    }

    static initJsonBool(json: Record<string, any>, key: string, fn?: Function): boolean | undefined {
        return json.hasOwnProperty(key) && (typeof json[key] === "string" || typeof json[key] === "number" || typeof json[key] === "boolean") && json[key].toString().length > 0
            ? fn === undefined
                ? typeof json[key] === "string"
                    ? json[key] === '1'
                    : typeof json[key] === "number"
                        ? json[key] === 1
                        : json[key]
                : fn(json[key])
            : undefined
    }
}
