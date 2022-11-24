import PlayerModel from '../models/player';

const create = async (player) => {
    return await PlayerModel.create(player);
}

export function winRateFromFile(file: string): string {
    return ''
}

export default { create }