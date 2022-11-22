export const getListOfPlayers = (games: Array<Object>) => {
    if (games.length == 0) {
        return {};
    }

    const players = {};
    for (let i = 0; i < games.length; i++) {
        if (players[games[i].p1] == undefined) {
            players[games[i].p1] = { numberOfPlays: 1 };
        } else {
            players[games[i].p1].numberOfPlays++;
        }
        if (players[games[i].p2] == undefined) {
            players[games[i].p2] = { numberOfPlays: 1 };
        } else {
            players[games[i].p2].numberOfPlays++;
        }
    }

    return players;
}

export const getWinner = (game: Object) => {
    const p1PokerHands = 10;
    const p2PokerHands = 9;

    if (p1PokerHands > p2PokerHands) {
        return game.p1;
    } else {
        return game.p2;
    }
}