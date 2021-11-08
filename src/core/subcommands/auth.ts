import {Credential, readCredential, writeCredential} from "../credential";
import * as readline from "readline"

type CredentialField = keyof Credential

export async function current() {
    const credential = await readCredential()
    const emailTemplate = "E-Mail Address: %s"
    const passwordTemplate = "Password: %s"

    if (credential instanceof Error) {
        console.error(emailTemplate, "None")
        console.error(passwordTemplate, "None")
        return
    }

    console.error(emailTemplate, credential.email)
    console.error(passwordTemplate, credential.password)
}

export async function configure(): Promise<void> {
    const credential = await (async () => {
        const credentialOrError = await readCredential()
        if (credentialOrError instanceof Error) {
            return undefined
        } else {
            return credentialOrError
        }
    })()

    const repl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    //TODO: refactor
    repl.question(prompt("email", credential), email => {
        repl.question(prompt("password", credential), password => {
            const newCredential: Credential = {
                email,
                password
            }

            writeCredential(newCredential)
            repl.close()
        })
    })
}

function prompt(field: CredentialField, credential?: Credential | undefined): string {
    switch (field) {
        case "email":
            return `E-Mail Address [${credential?.email ?? "None"}]: `
        case "password":
            return `Password [${credential?.password ?? "None"}]: `
    }
}