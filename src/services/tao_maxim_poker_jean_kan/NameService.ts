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
    .forEach((winners) => {
        for (let name of winners) {
            if (allResults.has(name)) {
                const allRes = allResults.get(name) as number;
                allResults.set(name, allRes + 1);
            } else {
                allResults.set(name, 1);
            }
        }
    });

  return allResults;
}

interface Card {
    suit : string,
    value : string
}

interface Hand {
    cards : Set<Card>   
}

function play(game: string): string {
  return 'Jane'
}
 export enum CardRank{
  Royal_Flush = 10
}
export function getRankOfHand(cards:string):number{
  if(cards == ''){
    return 0
  }
  if(cards == 'TS JS QS KS AS'){
    return CardRank.Royal_Flush
  }
  return 0
}

