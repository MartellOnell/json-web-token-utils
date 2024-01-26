import {createCipheriv, createDecipheriv} from 'crypto';

export default class CryptoUtility {
    private algorithm: string;
    private key: string;
    private iv: string;

    constructor(key: string, iv: string) {
        this.algorithm = 'aes-256-cbc';
        this.key = key;
        this.iv = iv;
    }

    encrypt(data: string): string {
        const cipher = createCipheriv(this.algorithm, this.key, this.iv);
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

    decrypt(encryptedData: string): string {
        const decipher = createDecipheriv(this.algorithm, this.key, this.iv);
        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}

