import PlayerModel from '../models/player';

const create = async (player) => {
    return await PlayerModel.create(player);
}

export default { create }