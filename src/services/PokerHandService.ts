import PlayerModel from '../models/player';

const create = async (player) => {
    return await PlayerModel.create(player);
}

export function winRateFromFile(file: string): string {
    return ''
}

export function loadData(fileName: string) {
    if (fileName === '') return 0

    return 1
}

export default { create }

