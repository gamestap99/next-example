import {AES, enc, mode, pad} from "crypto-js";
import {EFiSkuTEKi_P, EFiSkuTEKi_Q, EFiSkuTEKi_R} from "../const/EF.iSkuTEKi";
import {EFNlNDgjvS_P, EFNlNDgjvS_Q, EFNlNDgjvS_R} from "../const/EF.NlNDgjvS";
import {EFpJzgNxQs_P, EFpJzgNxQs_Q, EFpJzgNxQs_R} from "../const/EF.pJzgNxQs";
import {EFzrCflYRO_P, EFzrCflYRO_Q, EFzrCflYRO_R} from "../const/EF.zrCflYRO";
import {EFED_I, EFED_K} from "../const/EF.ED";

export class EDFile {
    protected static BGKc =
        AES.decrypt(EFiSkuTEKi_P, EFED_I).toString(enc.Utf8)
        + AES.decrypt(EFNlNDgjvS_P, EFED_I).toString(enc.Utf8)
        + AES.decrypt(EFpJzgNxQs_P, EFED_I).toString(enc.Utf8)
        + AES.decrypt(EFzrCflYRO_P, EFED_I).toString(enc.Utf8);

    protected static eDDc =
        AES.decrypt(EFiSkuTEKi_Q, EFED_K).toString(enc.Utf8)
        + AES.decrypt(EFNlNDgjvS_Q, EFED_K).toString(enc.Utf8)
        + AES.decrypt(EFpJzgNxQs_Q, EFED_K).toString(enc.Utf8)
        + AES.decrypt(EFzrCflYRO_Q, EFED_K).toString(enc.Utf8)
        + AES.decrypt(EFiSkuTEKi_R, EFED_K).toString(enc.Utf8)
        + AES.decrypt(EFNlNDgjvS_R, EFED_K).toString(enc.Utf8)
        + AES.decrypt(EFpJzgNxQs_R, EFED_K).toString(enc.Utf8)
        + AES.decrypt(EFzrCflYRO_R, EFED_K).toString(enc.Utf8);

    public static encrypt(value: any, key?: string): string {
        if (!key) {
            key = EDFile.eDDc;
        }

        if (typeof value === "object") {
            value = JSON.stringify(value);
        }

        const encrypted = AES.encrypt(value, enc.Utf8.parse(key), {
            iv: enc.Utf8.parse(EDFile.BGKc),
            mode: mode.CBC,
            padding: pad.Pkcs7,
            blockSize: 256 / 32,
        });

        let data = encrypted.toString();
        // data = data.replaceAll('=', 'equal');
        // data = data.replaceAll('/', 'slash');
        // data = data.replaceAll('+', 'plus');

        data = data.split('=').join('equal');
        data = data.split('/').join('slash');
        data = data.split('+').join('plus');

        return data;
    }

    public static decrypt(value: any, key?: string): any {
        if (!key) {
            key = EDFile.eDDc;
        }

        // value = value.replaceAll('equal', '=');
        // value = value.replaceAll('slash', '/');
        // value = value.replaceAll('plus', '+');

        value = value.split('equal').join('=');
        value = value.split('slash').join('/');
        value = value.split('plus').join('+');

        const decrypted = AES.decrypt(value, enc.Utf8.parse(key), {
            iv: enc.Utf8.parse(EDFile.BGKc),
            mode: mode.CBC,
            padding: pad.Pkcs7,
            blockSize: 256 / 32,
        });

        let data = decrypted.toString(enc.Utf8);

        try {
            data = JSON.parse(data);
        } catch (_) {
            //
        }

        return data;
    }
}
