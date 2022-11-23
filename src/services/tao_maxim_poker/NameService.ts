import * as fs from "fs";
import { Types } from "mongoose";

function extractNames(line: string): string[] {
  return line
    .split(/(\s)/)
    .filter((item) => item.endsWith(":"))
    .map((name) => name.substring(0, name.length - 1));
}

export function getNamesAndWinRate(fileName: string): Map<string, number> {
  const content = fs.readFileSync(fileName, "utf8");

  const records = new Map<string, Map<string, number>>();
  content
    .split(/\r?\n/)
    .forEach((game) => {
      const player1Name:string = extractNames(game)[0]
      const player2Name:string = extractNames(game)[1];
    
      const player1WinScore = isPlayer1Win(game) ? 1: 0;
      updateRecord(records, player1Name, player1WinScore);
      const player2WinScore = isPlayer1Win(game) ? 0: 1;
      updateRecord(records, player2Name, player2WinScore);
    });


  const result = new Map<string, number>();
  
  records.forEach((value: Map<string, number>, playerName: string) => {
    result.set(playerName, value.get("rate")!);
  });
  return result;
}

function updateRecord(records: Map<string, Map<string, number>>, playerName: string, playerWinScore: number) {
  if (records.has(playerName)) {
    const count = records.get(playerName)!.get("count") as number;
    records.get(playerName)!.set("count", count + 1);

    const win = records.get(playerName)!.get("win") as number;
    records.get(playerName)!.set("win", win + playerWinScore);

    records.get(playerName)!.set("rate", (records.get(playerName)!.get("win") as number) / (records.get(playerName)!.get("count") as number));

  } else {
    records.set(playerName, new Map<string, number>());
    const player2Record = records.get(playerName)!;
    player2Record.set("count", 1);
    player2Record.set("win", playerWinScore);
    player2Record.set("rate", playerWinScore);

  }
}

function isPlayer1Win(game: string) {
  const player1Hands = game.split(" ").slice(1, 6).join("")
  return player1Hands == "ADKDQDJD10D";
}
