import { ParsingError } from "@xieyuheng/partech/lib/errors"
import { Command, CommandRunner } from "@xieyuheng/command-line"
import { ty } from "@xieyuheng/ty"
import fs from "node:fs"
import { relative } from "node:path"
import process from "node:process"
import { Fetcher } from "../../fetcher"
import { Report } from "../../lang/errors/Report"
import { Loader } from "../../loader"
import { createURL } from "../../utils/createURL"

type Args = { path: string }
type Opts = {}

export class Run extends Command<Args, Opts> {
  name = "run"

  description = "Run an Petri net program"

  args = { path: ty.string() }

  // prettier-ignore
  help(runner: CommandRunner): string {
    const { blue } = this.colors

    return [
      `Run a file:`,
      ``,
      blue(`  ${runner.name} ${this.name} <file>`),
      ``,
      `Run a URL:`,
      ``,
      blue(`  ${runner.name} ${this.name} <url>`),

      ``,
    ].join("\n")
  }

  async execute(argv: Args & Opts): Promise<void> {
    const fetcher = new Fetcher()

    fetcher.register("file", {
      async fetchText(url) {
        if (process.platform === "win32") {
          return await fs.promises.readFile(url.pathname.slice(1), "utf8")
        } else {
          return await fs.promises.readFile(url.pathname, "utf8")
        }
      },

      formatURL(url) {
        if (process.platform === "win32") {
          return relative(process.cwd(), url.pathname.slice(1)).replaceAll(
            "\\",
            "/",
          )
        } else {
          return relative(process.cwd(), url.pathname)
        }
      },
    })

    const url = createURL(argv.path)
    const text = await fetcher.fetchText(url)

    try {
      const loader = new Loader({ fetcher })
      await loader.load(url)
    } catch (error) {
      if (error instanceof ParsingError) {
        console.error(error.report(text))
        process.exit(1)
      } else if (error instanceof Report) {
        console.error(error.format())
        process.exit(1)
      } else {
        throw error
      }
    }
  }
}
