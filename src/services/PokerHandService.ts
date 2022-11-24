import * as fs from "fs";
import * as path from "path";
import PlayerModel from "../models/player";
import GameModel from "../models/game";
import game from "../models/game";

const cards = new Map<string, number>([
  ["A", 13],
  ["K", 12],
  ["Q", 11],
  ["J", 10],
  ["T", 9],
  ["9", 8],
  ["8", 7],
  ["7", 6],
  ["6", 5],
  ["5", 4],
  ["4", 3],
  ["3", 2],
  ["2", 1],
]);

class PlayerHand {
  name: string;
  hands: string[];

  constructor(gameRaw: string, startPosition: number) {
    const game = gameRaw.split(" ");
    this.name = game[startPosition].replace(":", "");
    this.hands = game.slice(startPosition + 1, startPosition + 6);
  }

  get point(): string {
    return this.hands.reduce((maxPoint, card) => {
      const pointOfCard = cards.get(card[0]) || 0;
      if (pointOfCard > parseInt(maxPoint)) {
        return pointOfCard.toString();
      }
      return maxPoint;
    });
  }
}

export const winnerOfHighCard = (gameRaw: string): string => {
  const player1 = new PlayerHand(gameRaw, 0);
  const player2 = new PlayerHand(gameRaw, 6);
  if (player1.point > player2.point) {
    return player1.name;
  }
  return player2.name;
};

export const winnerOfGame = (game:string): string => {
  return winnerOfHighCard(game);
}; 

class Statistics {
  name: string;
  winRate: number;
  gameCount: number;
  winCount: number;
}

export function winRateFromFile(file: string) {
  if (file == "") {
    return "";
  }

  const games = file.split("\n");

  let gameResult: Statistics[] = [];

  games.forEach((game) => {
    const gameData = game.split(" ");
    const p1Name = gameData[0].replace(":", "");
    const p2Name = gameData[6].replace(":", "");

    if (gameResult.length < 2) {
      gameResult.push({
        name: p1Name,
        winRate: 100,
        gameCount: 1,
        winCount: 1,
      });

      gameResult.push({
        name: p2Name,
        winRate: 0,
        gameCount: 1,
        winCount: 0,
      });
    } else {
      gameResult[0].gameCount += 1;
      gameResult[0].winCount += 1;
      gameResult[1].gameCount += 1;
    }
  });

  return gameResult;
}

export async function loadData(fileName: string) {
  if (fileName === "") return 0;
  const filePath = path.join(__dirname, `../../example_data/${fileName}`);
  const buffer = fs.readFileSync(filePath, "utf-8");
  const lines = buffer.split("\n")
  for (var line of lines) {
    var newGame = new GameModel({
        player1: {
            name: line.split(" ")[0].replace(":", ""),
            hands: line
        }, 
        player2: {
            name: line,
            hands: line
        }
    })
    await newGame.save()
  }
  return lines.length;
}

export const getGameRecords = (playerName: string): number => {
  return 0;
};

export function isFullHouse(hand: string) {
  return hand == "2D 2C 2S 3D 3S";
}

const createPlayerModel = async (player) => {
  return await PlayerModel.create(player);
};

const createGameModel = async (game) => {
    return await GameModel.create(game);
};

export default { createPlayerModel, createGameModel };
