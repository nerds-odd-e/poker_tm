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
    ß
    const p1PokerHands = 10;
    const p2PokerHands = 9;

    if (p1PokerHands > p2PokerHands) {
        return game.p1;
    } else {
        return game.p2;
    }
}

export const isStraight = (cardValues: Array<string>) => {
    for (let i = 0; i < cardValues.length; i++) {
        if (cardValues[i] === "J") {
            cardValues[i] = "11";
        }
        if (cardValues[i] === "Q") {
            cardValues[i] = "12";
        }
        if (cardValues[i] === "K") {
            cardValues[i] = "13";
        }
        if (cardValues[i] === "A") {
            cardValues[i] = "14";
        }
    }
    const isStraight = cardValues.every((value, index) => {
        if (index === 0) {
            return true;
        }
        return value - cardValues[index - 1] === 1;
    });
    return isStraight;
}
