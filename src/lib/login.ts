import puppeteer, {Page} from "puppeteer"
import {Credential} from "../core/credential";


const LOGIN_PAGE_URL = "https://id.jobcan.jp/users/sign_in"
const PROFILE_PAGE_URL = "https://id.jobcan.jp/account/profile"

export async function login(credential: Credential): Promise<Page | Error> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        await page.goto(LOGIN_PAGE_URL)
        await page.type("#user_email", credential.email)
        await page.type("#user_password", credential.password)
        await page.click("input[type=submit]")

        if (page.url() != PROFILE_PAGE_URL) {
            console.error("Failed to login. Please check your credential. execute next subcommand")
            console.error(`auth current`)

            //TODO
            return new Error()
        }

        return page
    } catch (err) {
        if (err instanceof Error) {
            return err
        }

        throw err
    }
}