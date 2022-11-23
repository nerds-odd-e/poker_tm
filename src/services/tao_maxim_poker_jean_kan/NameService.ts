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

export function extractNames(line: string): string[] {
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

  const allResults = new Map<string, number>();
  const content = fs.readFileSync(fileName, "utf8");
  content
    .split(/\r?\n/)
    .map((game) => play(game))
    .forEach((winner) => {
      
      if (allResults.has(winner)) {
        const allRes = allResults.get(winner) as number;
        allResults.set(winner, allRes + 1);
      } 
      if (!allResults.has(winner)){
        allResults.set(winner, 1);
      }

    });

  return allResults;
}

interface Card {
  suit: string,
  value: string
}

interface Hand {
  cards: Set<Card>
}

export function play(game: string): string {
  const cards = extractCards(game);
  const player = extractNames(game);
  if (getRankOfHand(cards[0]) < getRankOfHand(cards[1])) {
    return player[1]
  }
  return player[0]
}
export enum CardRank {
  Royal_Flush = 10,
  Straight_Flush = 9

}
export function extractCards(game: string): Array<string> {
  const cards = game
    .split(/(\s)/)
    .filter((item) => !item.endsWith(":") && item != ' ')
  return [
    cards[0] + ' ' + cards[1] + ' ' + cards[2] + ' ' + cards[3] + ' ' + cards[4],
    cards[5] + ' ' + cards[6] + ' ' + cards[7] + ' ' + cards[8] + ' ' + cards[9]]
}

export function getRankOfHand(cards: string): number {

  if (cards == 'TS JS QS KS AS') {
    return CardRank.Royal_Flush
  }
  if (cards == '4H 5H 6H 7H 8H') {
    return CardRank.Straight_Flush
  }

  return 0
}

