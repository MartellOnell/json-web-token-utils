import fs from 'fs';
import randomString from './randomString.js';
// import { dirname } from 'path';

// const __dirname = dirname(new URL(import.meta.url).pathname)
// const envPath = `${__dirname}/../.env`
export type updateEnvConfigFailed = { status: "failed" }
export type updateEnvConfigSuccess = { status: "success", "key": string, "iv": string }
export type updateEnvConfigReturnType = updateEnvConfigSuccess | updateEnvConfigFailed
export type updateEnvConfigType = (envPath: string) => updateEnvConfigReturnType


export default function updateEnvConfig(envPath: string): updateEnvConfigReturnType {
    try {
        const data: string = fs.readFileSync(envPath, 'utf8').trim();
        const dData: string[] = data.split('\n')
        let cleanData: string[] = []

        for (let i: number = 0; i < dData.length; i++) {
            if (!dData[i].includes("CRYPTO")) {
                const line: string[] = dData[i].split('=')
                const key: string = line[0]
                const value: string = line[1]
                cleanData.push(`${key}=${value}`)
            }
        }

        const cryptoKey: string = randomString("key")
        const cryptoIv: string = randomString("iv")
        cleanData.push(`CRYPTO_KEY="${cryptoKey}"`)
        cleanData.push(`CRYPTO_IV="${cryptoIv}"`)
        const envData: string = cleanData.join('\n')

        fs.writeFileSync(envPath, envData);
        return { status: "success", "key": cryptoKey, "iv": cryptoIv}
    } catch (error) {
        return { status: "failed" }
    }
}