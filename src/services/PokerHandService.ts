import PlayerModel from "../models/player";

export const winnerOfHighCard = (game: string) => {
  return "Mike";
};

const create = async (player) => {
  return await PlayerModel.create(player);
};

export function winRateFromFile(file: string): string {
  return "";
}

export function loadData(fileName: string) {
  return "ok";
}

export const getTotalGames = (): number => {
    return 0
}

export default { create };
