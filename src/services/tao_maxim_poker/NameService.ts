import * as fs from "fs";

export function getNames(fileName: string): Set<string> {
  if (fs.existsSync(fileName)) {
    const lines = fs.readFileSync(fileName, "utf8");

    return new Set(
      lines
        .split(/\r?\n/)
        .map((line) => extractNames(line))
        .flatMap((array) => array)
    );
  }
  return new Set();
}

function extractNames(line: string): string[] {
  return line
    .split(/(\s)/)
    .filter((item) => item.endsWith(":"))
    .map((name) => name.substring(0, name.length - 1));
}
