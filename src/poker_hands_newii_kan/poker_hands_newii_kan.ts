export const getListOfPlayers = (games: Array<Object>) => {
    if (games.length == 0) {
        return [];
    }
    // const players = games.map(({game}) => {
    //     return game.p1;
    // });

    const players = [];
    for (let i = 0; i < games.length; i++) {
        players.push(games[i].p1);
        players.push(games[i].p2);
    }

    return players;
}
