import jwt, { JwtPayload } from "jsonwebtoken"

export default class JwtUtility {
    private seqKey: string;

    constructor(seqKey: string) {
        this.seqKey = seqKey;
    }

    public generateToken(data: JwtPayload, timeout: string) {
        return jwt.sign(data, this.seqKey, { expiresIn: timeout }) // using ms format (js lib)
    }

    public verifyToken(token: string) {
        return jwt.verify(token, this.seqKey)
    }
}