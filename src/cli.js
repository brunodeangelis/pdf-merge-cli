import { readFiles } from "./index";

export async function cli(args) {
  await readFiles();
}
