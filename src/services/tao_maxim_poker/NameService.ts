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
      const player1Name = extractNames(game)[0]
      const player2Name = extractNames(game)[1];
    
      updateRecord(records, player1Name, isPlayer1Win(game));
      updateRecord(records, player2Name, !isPlayer1Win(game));
    });


  const result = new Map<string, number>();
  
  records.forEach((value: Map<string, number>, playerName: string) => {
    result.set(playerName, value.get("rate")!);
  });
  return result;
}

function updateRecord(records: Map<string, Map<string, number>>, playerName: string, isPlayerWin: boolean) {
  const playerWinScore = isPlayerWin ? 1: 0;
  if (records.has(playerName)) {
    const playerRecord = records.get(playerName)!;
    const count = playerRecord.get("count")! + 1;
    const win = (playerRecord.get("win") as number) + playerWinScore;
    playerRecord.set("count", count);    
    playerRecord.set("win", win);
    playerRecord.set("rate", win/count);

  } else {
    const playerRecord = new Map<string, number>();
    playerRecord.set("count", 1);
    playerRecord.set("win", playerWinScore);
    playerRecord.set("rate", playerWinScore);
    records.set(playerName, playerRecord);
  }
}

function isPlayer1Win(game: string) {
  const player1Hands = game.split(" ").slice(1, 6).join("")
  return player1Hands == "ADKDQDJD10D";
}
