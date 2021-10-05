import {App} from "../const/App";
import Hashids from 'hashids';

interface CO {
    salt: string;
    length: number;
}

type NumberLike = number | bigint

export class CHashids {
    protected static C: CO;

    static _init() {
        if (typeof this.C === "undefined") {
            this.C = App.Hashids.connections.main;
        }
    }

    static connection(name: string) {
        const hc: any = App.Hashids.connections;

        if (hc.hasOwnProperty(name)) {
            this.C = hc[name];
        } else {
            this.C = hc.main;
        }

        return this;
    }

    static encode(number: any): string {
        const hashids = new Hashids(this.C.salt, this.C.length);

        return hashids.encode(number);
    }

    static decode(id: string): NumberLike[] {
        const hashids = new Hashids(this.C.salt, this.C.length);

        return hashids.decode(id);
    }

    static decodeGetFirst(id: string): number | null {
        const hashids = new Hashids(this.C.salt, this.C.length);
        const result = hashids.decode(id);

        return result.length > 0 ? result[0] as number : null;
    }
}

CHashids._init();