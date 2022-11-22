export const getListOfPlayers = (games: Array<Object>) => {
    if (games.length == 0) {
        return new Set();
    }

    const players = new Set();
    for (let i = 0; i < games.length; i++) {
        players.add(games[i].p1);
        players.add(games[i].p2);
    }

    return players;
}
