import puppeteer from "puppeteer"
import {Credential, readCredential} from "../credential";

export async function attend(credential: Credential): Promise<void> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto("https://id.jobcan.jp/users/sign_in")
        await page.type("#user_email", credential.email)
        await page.type("#user_password", credential.password)
        await page.click("input[type=submit]")

        if (page.url() != "https://id.jobcan.jp/account/profile") {
            console.error("Failed to login. Please check your credential. execute next subcommand")
            console.error(`auth current`)
            return
        }

        await page.goto("https://ssl.jobcan.jp/employee")
        // await page.click("#adit-button-work-start")
    } catch (err) {
        console.error(err)
        throw err
    } finally {
        await browser.close()
    }
}
