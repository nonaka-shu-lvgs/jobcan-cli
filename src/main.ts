import * as yargs from "yargs"
import * as auth from "./core/subcommands/auth"
import * as timestamp from "./core/subcommands/timestamp"
import {readCredential} from "./core/credential";


const argv = yargs
    .command("auth <subcommand>", "configure your credential", b => {
        return b.command("configure", "configure your credential")
            .command("current", "show your current credential")
            .demandCommand(1)
    })
    .command("timestamp <subcommand>", "timestamp 出勤 or 退勤", b => {
        return b.command("attend", "出勤の打刻を行います")
            .command("exit", "退勤の打刻を行います")
            .demandCommand(1)
    })
    .demandCommand(1)
    .help()
    .argv

if (argv instanceof Promise) {
    process.exit(1)
}

const [command, subcommand] = argv._
switch (command) {
    case "auth":
        switch (subcommand) {
            case "configure":
                auth.configure()
                break
            case "current":
                auth.current()
                break
        }
        break
    case "timestamp":
        readCredential().then(credential => {
            if (credential instanceof Error) {
                console.error(credential.message)
                process.exit(1)
            }

            switch (subcommand) {
                case "attend":
                    timestamp.attend(credential).then(() => {
                        process.exit()
                    }).catch(err => {
                        console.error(err)
                        process.exit(1)
                    })
                    break
                case "exit":
                    timestamp.exit(credential).then(() => {
                        process.exit()
                    }).catch(err => {
                        console.error(err)
                        process.exit(1)
                    })
                    break
            }
        })
        break
}
