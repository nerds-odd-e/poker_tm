import * as fs from "fs";
import * as path from "path";
import PlayerModel from '../models/player';

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
    if (fileName === '') return 0
    const filePath = path.join(__dirname, '../../example_data/one_game.txt');
    const buffer = fs.readFileSync(filePath, "utf-8");

    return buffer.split("\n").length
}

export const getGameRecords = (playerName: string): number => {
    return 0
}


export default { create };
