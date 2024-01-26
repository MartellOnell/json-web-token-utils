import { JwtPayload } from "jsonwebtoken";
import CryptoUtility from "./crypto.js";
import JwtUtility from "./jwt.js";
import updateEnvConfig, { updateEnvConfigType, updateEnvConfigReturnType } from "./updateIvKey.js";
import { config } from "dotenv";
config();

type verifyDecryptedTokenReturnType = Promise<JwtPayload | string>
type updateIvKeyReturnType = { status: "success" | "failed" }

export default class MainInterface {
    private secKey: string;
    private iv: string;
    private key: string;
    private cryptoTools: CryptoUtility;
    private jwtTools: JwtUtility;
    private updateEnvConfig: updateEnvConfigType;
    private envPath: string;

    constructor(envPath: string) {
        this.envPath = envPath;
        this.secKey = process.env.SECRET_KEY;
        this.iv = process.env.CRYPTO_IV;
        this.key = process.env.CRYPTO_KEY;
        this.cryptoTools = new CryptoUtility(this.key, this.iv);
        this.jwtTools = new JwtUtility(this.secKey);
        this.updateEnvConfig = updateEnvConfig;
    }

    async signEncryptedToken(data: JwtPayload, timeout: string): Promise<string> {
        const token: string = this.jwtTools.generateToken(data, timeout);
        const encryptedToken: string = this.cryptoTools.encrypt(token);
        return encryptedToken;
    }

    async verifyDecryptedToken(encryptedToken: string): verifyDecryptedTokenReturnType {
        try {
            const decryptedToken: string = this.cryptoTools.decrypt(encryptedToken);
            const token: string | JwtPayload = this.jwtTools.verifyToken(decryptedToken);
            return token;
        } catch (error) {
            switch (error.message) {
                case "invalid signature":
                    return "wrong key signature"
                
                case "jwt expired":
                    return "token expired"
            
                default:
                    return "invalid token"
            }
        }
    }

    updateIvKey(): updateIvKeyReturnType {
        const update: updateEnvConfigReturnType = this.updateEnvConfig(this.envPath)

        if (update.status === "success") {
            this.iv = update.iv
            this.key = update.key
            this.cryptoTools = new CryptoUtility(this.key, this.iv);
            this.jwtTools = new JwtUtility(this.secKey);

            return { status: "success" }
        } else {
            return { status: "failed" }
        }
    }
}