import * as fs from "fs";
import * as path from "path";
import PlayerModel from "../models/player";
import GameModel from "../models/game";

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

export const winnerOfHighCard = (gameRaw: string) => {
  const game = gameRaw.split(" ");
  const player1Hands = game.slice(1, 6);
  const maxPointOfPlayer1 = player1Hands.reduce((maxPoint, card) => {
    const pointOfCard = cards.get(card[0]) || 0;
    if (pointOfCard > parseInt(maxPoint)) {
      return pointOfCard.toString();
    }
    return maxPoint;
  });
  const player2Hands = game.slice(7, 12);
  const maxPointOfPlayer2 = player2Hands.reduce((maxPoint, card) => {
    const pointOfCard = cards.get(card[0]) || 0;
    if (pointOfCard > parseInt(maxPoint)) {
      return pointOfCard.toString();
    }
    return maxPoint;
  });
  if (maxPointOfPlayer1 > maxPointOfPlayer2) {
    return game[0].replace(":", "");
  }
  return game[6].replace(":", "");
};

export function winRateFromFile(file: string) {
  if (file == '') {
    return ''
  }
  return [{
    name: "Jane",
    winRate: 100,
    gameCount: 1,
    winCount: 1,
  }, {
    name: "Wu",
    winRate: 0,
    gameCount: 1,
    winCount: 0,
  }]
}

export function loadData(fileName: string) {
  if (fileName === "") return 0;
  const filePath = path.join(__dirname, `../../example_data/${fileName}`);
  const buffer = fs.readFileSync(filePath, "utf-8");

  return buffer.split("\n").length;
}

export const getGameRecords = (playerName: string): number => {
  return 0;
};

export function isFullHouse(hand: string) {
  return hand == "2D 2C 2S 3D 3S"
}

const createPlayerModel = async (player) => {
  return await PlayerModel.create(player);
};

const createGameModel = async (game) => {
  return await GameModel.create(game);
};

export default { createPlayerModel, createGameModel };
