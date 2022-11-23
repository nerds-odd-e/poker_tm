const totalACard = (cards: string[]) =>
  cards.filter((e) => e.includes('A')).length;

const isFirstPlayerWin = (player1_hand: string[], player2_hand: string[]) => {
  if (totalACard(player1_hand) > totalACard(player2_hand)) {
    return true;
  }
  if (totalACard(player1_hand) == totalACard(player2_hand)) {
    const p1 = player1_hand
      .filter((e) => !e.includes('A'))
      .map((e) => Number.parseInt(e.charAt(0)));
    const p2 = player2_hand
      .filter((e) => !e.includes('A'))
      .map((e) => Number.parseInt(e.charAt(0)));
    return p1.reduce((a, b) => a + b) > p2.reduce((a, b) => a + b);
  }
  return false;
};

const getWinRate = (game: String) => {
  if (game === '') {
    return '';
  }
  const games = game.split(',')
  const winners = games.map(game => {

    const gameResult = getGameResult(game)
    return [`${gameResult[0].playerName}${calWinRate(gameResult[0])}`, `${gameResult[1].playerName}${calWinRate(gameResult[1])}`];
  })

  return winners.join(",");
};

interface GameRecord {
  playerName: string;
  gameResults: string[];
}

const getGameResult = (game: String) => {
  const s = game.split(' ');
  const player1_hand = s.slice(1, 6);
  const player2_hand = s.slice(7);
  if (isFirstPlayerWin(player1_hand, player2_hand)) {
    return [
      {
        playerName: s[0],
        gameResults: ['win']
      },
      {
        playerName: s[6],
        gameResults: ['lose']
      }
    ]
  }
  else {
    return [
      {
        playerName: s[6],
        gameResults: ['win']
      },
      {
        playerName: s[0],
        gameResults: ['lose']
      }
    ]
  }
}
const calWinRate = (game: GameRecord) => {
  const winCount = game.gameResults.filter(gameResult => gameResult == 'win').length;
  const gameCount = game.gameResults.length;

  return winCount / gameCount * 100;
}

export default getWinRate;
