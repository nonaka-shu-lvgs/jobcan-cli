import {Credential, readCredential, writeCredential} from "../credential";
import inquirer from "inquirer";

type CredentialField = keyof Credential

export async function current(): Promise<void> {
    const credential = await readCredential()
    const emailTemplate = "E-Mail Address: %s"
    const passwordTemplate = "Password: %s"

    if (credential instanceof Error) {
        console.error(emailTemplate, "None")
        console.error(passwordTemplate, "None")
        return
    }

    console.error(emailTemplate, credential.email)
    console.error(passwordTemplate, credential.password.split("").map(() => "*").join(""))
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

    inquirer.prompt([
        {
            name: "email",
            type: "input",
            message: "E-Mail Address:",
            default: credential?.email
        },
        {
            name: "password",
            type: "password",
            message: "Password:",
            default: credential?.password
        }
    ]).then((res) => {
        const credential = {...res} as Credential

        writeCredential(credential)
    })
}