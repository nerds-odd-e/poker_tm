import PlayerModel from '../models/player';

const create = async (player) => {
    return await PlayerModel.create(player);
}

export function winRateFromFile(file: string): string {
    return ''
}

export function loadData(fileName: string) {
    if (fileName === '') return "ok"
}

export default { create }

