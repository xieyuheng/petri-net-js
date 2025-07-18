import { LocalFileStore } from "@xieyuheng/framework/lib/file-stores/LocalFileStore"
import os from "os"
import Path from "path"
import process from "process"

export class AppHome extends LocalFileStore {
  constructor() {
    super({
      dir:
        process.env["PETRI_NET_HOME"] ||
        Path.resolve(os.homedir(), ".petri-net"),
    })
  }
}
