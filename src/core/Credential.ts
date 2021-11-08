import * as path from "path";
import * as fs from "fs/promises"


export interface Credential {
    email: string,
    password: string
}

const CREDENTIAL_PATH = path.resolve(__dirname, "../../credential.json")

export async function readCredential(): Promise<Credential | Error> {
    try {
        return require(CREDENTIAL_PATH)
    } catch (err) {
        return new Error("credential is not configured")
    }
}

export async function writeCredential(credential: Credential): Promise<void | Error> {
    try {
        return await fs.writeFile(CREDENTIAL_PATH, JSON.stringify(credential))
    } catch (err) {
        if (err instanceof Error) {
            return err
        }

        console.error(err)
        throw err
    }
}