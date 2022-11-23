import * as fs from "fs";
import { Types } from "mongoose";

export function getNames(fileName: string): Set<string> {
  if (!fs.existsSync(fileName)) {
    return new Set();
  }

  return new Set(
    splitIntoNames(fs.readFileSync(fileName, "utf8")).flatMap((array) => array)
  );
}

export function getNamesAndGamesCount(fileName: string): Map<string, number> {
  if (!fs.existsSync(fileName)) {
    return new Map();
  }

  const mapNameAndGame = new Map();

  splitIntoNames(fs.readFileSync(fileName, "utf8")).forEach((lineNames) => {
    lineNames.forEach((name) => {
      if (mapNameAndGame.has(name)) {
        mapNameAndGame.set(name, mapNameAndGame.get(name) + 1);
      } else {
        mapNameAndGame.set(name, 1);
      }
    });
  });
  return mapNameAndGame;
}

function extractNames(line: string): string[] {
  return line
    .split(/(\s)/)
    .filter((item) => item.endsWith(":"))
    .map((name) => name.substring(0, name.length - 1));
}

function splitIntoNames(content: string): string[][] {
  return content.split(/\r?\n/).map((line) => extractNames(line));
}

export function getNamesAndWinCount(fileName: string): Map<string, number> {
  if (!fs.existsSync(fileName)) {
    return new Map();
  }

  const allResults = new Map<string,number>();
  const content = fs.readFileSync(fileName, "utf8");
  content
    .split(/\r?\n/)
    .map((game) => play(game))
    .forEach((result) => {
        for (let name of result.keys()) {
            const res = result.get(name) as number;
            if (allResults.has(name)) {
                const allRes = allResults.get(name) as number;
                allResults.set(name, allRes + res);
            } else {
                allResults.set(name, res);
            }
        }
    });

  return allResults;
}

export function getNamesAndWinRate(fileName: string): Map<string, number> {
  const game = fs.readFileSync(fileName, "utf8");
  const player1Name:string = extractNames(game)[0]
  const player2Name:string = extractNames(game)[1];

  const record = new Map<string, Map<string, number>>();
  record.set(player1Name, new Map<string, number>());
  const player1Record = record.get(player1Name)!;
  player1Record.set("count", 1);
  player1Record.set("win", isPlayer1Win(game) ? 1: 0);
  player1Record.set("rate", isPlayer1Win(game) ? 1: 0);
  
  record.set(player2Name, new Map<string, number>());
  const player2Record = record.get(player2Name)!;
  player2Record.set("count", 1);
  player2Record.set("win", isPlayer1Win(game) ? 0: 1);
  player2Record.set("rate", isPlayer1Win(game) ? 0: 1);


  const result = new Map<string, number>();
  result.set(player1Name, record.get(player1Name)!.get("rate")!);
  result.set(player2Name, record.get(player2Name)!.get("rate")!);
  return result;
}

function isPlayer1Win(game: string) {
  const player1Hands = game.split(" ").slice(1, 6).join("")
  return player1Hands == "ADKDQDJD10D";
}

interface Card {
    suit : string,
    value : string
}

interface Hand {
    cards : Set<Card>   
}

function play(game: string): Map<string, number> {
  const player1Name:string = extractNames(game)[0]

  const player1Hands = game.split(" ").slice(1, 6).join("")

  return new Map([
    [player1Hands == "ADKDQDJD10D" ? player1Name : extractNames(game)[1],1]
  ]);
}
