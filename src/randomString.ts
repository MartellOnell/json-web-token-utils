export default function randomString(type: "iv" | "key"): string {
    const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const num = "0123456789"
    const special = "!@#$%^&*()_+~`|}{[]:;?><,./-"
    const resultLength = type === "iv" ? 16 : 32

    let result = ""
    for (let i = 0; i < resultLength; i++) {
        const random = Math.floor(Math.random() * 3)
        if (random === 0) {
            result += alpha[Math.floor(Math.random() * alpha.length)]
        } else if (random === 1) {
            result += num[Math.floor(Math.random() * num.length)]
        } else {
            result += special[Math.floor(Math.random() * special.length)]
        }
    }

    return result
}