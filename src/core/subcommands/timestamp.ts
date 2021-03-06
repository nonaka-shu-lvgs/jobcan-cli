import {Credential} from "../credential";
import {login} from "../../lib/login";


export const TIMESTAMP_URL = "https://ssl.jobcan.jp/jbcoauth/login"

export async function attend(credential: Credential): Promise<void> {
    const page = await login(credential)

    if (page instanceof Error) {
        return
    }

    try {
        await page.goto(TIMESTAMP_URL)
        await page.click("#adit-button-work-start")
    } catch (err) {
        console.error(err)
        throw err
    } finally {
        await page.browser().close()
    }
}

export async function exit(credential: Credential): Promise<void> {
    const page = await login(credential);

    if (page instanceof Error) {
        return
    }

    try {
        await page.goto(TIMESTAMP_URL)
        await page.click("#adit-button-work-end")
    } catch (err) {
        console.error(err)
        throw err
    } finally {
        await page.browser().close()
    }
}