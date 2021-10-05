import {AES, enc, HmacSHA256, lib, mode, pad, PBKDF2} from "crypto-js";
import {unserialize} from 'php-serialize';
import {Utils} from "./Utils";

export class Crypt {
    private static readonly EncKey = "G&X98d2XPo8EQviSAYI&$3*9Ipc0FJ*";
    private static readonly SLKey = "f3b776t2fjqi3363mxjtj2e58f9312am";
    private static readonly KeySize = 256;
    private static readonly Iterations = 128;

    static encrypt(text: string): string {
        const salt = lib.WordArray.random(128 / 8);
        const key = PBKDF2(this.EncKey, salt, {
            keySize: this.KeySize / 32,
            iterations: this.Iterations
        });
        const iv = lib.WordArray.random(128 / 8);
        const encrypted = AES.encrypt(text, key, {
            iv: iv,
            padding: pad.Pkcs7,
            mode: mode.CBC
        });

        return salt.toString() + iv.toString() + encrypted.toString();
    }

    static decrypt(text: string): string {
        const salt = enc.Hex.parse(text.substr(0, 32));
        const iv = enc.Hex.parse(text.substr(32, 32));
        const encrypted = text.substring(64);
        const key = PBKDF2(this.EncKey, salt, {
            keySize: this.KeySize / 32,
            iterations: this.Iterations
        });

        return AES.decrypt(encrypted, key, {
            iv: iv,
            padding: pad.Pkcs7,
            mode: mode.CBC
        }).toString(enc.Utf8);
    }

    static laravelEncrypt(data: string): string {
        let iv: any = lib.WordArray.random(16);
        const key = enc.Base64.parse(this.SLKey);
        const encrypted: lib.CipherParams = AES.encrypt(data, key, {
            iv: iv,
        });

        // iv = enc.Base64.stringify(iv);
        iv = encrypted.iv.toString(enc.Base64);
        const ciphertext = encrypted.ciphertext.toString(enc.Base64);

        let result: any = {
            iv: iv,
            value: encrypted.toString(),
            mac: HmacSHA256(iv + ciphertext, key).toString()
        }

        result = JSON.stringify(result);
        result = enc.Utf8.parse(result);

        return enc.Base64.stringify(result);
    }

    static laravelDecrypt(text: string): string {
        const encryptStr = enc.Base64.parse(text);
        let encryptData: any = encryptStr.toString(enc.Utf8);
        encryptData = JSON.parse(encryptData);
        const iv: any = enc.Base64.parse(encryptData.iv);
        let decrypted: any = AES.decrypt(encryptData.value, enc.Utf8.parse(this.SLKey), {
            iv: iv,
        });

        decrypted = enc.Utf8.stringify(decrypted);

        return decrypted ? unserialize(decrypted) : '';
    }

    protected static getKey() {
        const key = this.EncKey.indexOf('base64:') === 0 ? this.EncKey.substr(7) : this.EncKey;

        return enc.Base64.parse(key);
    }

    protected static getCipherMethod(key: string) {
        switch (key.length) {
            case 16:
                return 'aes128';
            case 24:
                return 'aes192';
            case 32:
                return 'aes256';
            default:
                throw new Error('The key is invalid');
        }
    }

    static localStoreEncrypt(name: string, value: any): void {
        localStorage.setItem(name, this.encrypt(typeof value === 'object' ? JSON.stringify(value) : value));
    };

    static localStoreDecrypt(name: string): string {
        let str: string = "";

        try {
            const item = localStorage.getItem(name);

            if (item) {
                str = this.decrypt(item);
            }
        } catch (e) {
            Utils.checkError(e);
        }

        return str;
    };

    static localStoreRemove(name: string) {
        localStorage.removeItem(name);
    }
}