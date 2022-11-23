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
  const winners = games.map(game => getWinner(game))

  return winners.join(",");
};

interface GameRecord {
  playerName: string;
  gameResults: string[];
}

const  getWinner = (game: String) => {
  let gameResult = getGameResult(game);
  const gameRecord: GameRecord[] = [
    {
      playerName: gameResult.winner,
      gameResults: ['win']
    },
    {
      playerName: gameResult.loser,
      gameResults: ['lose']
    }
  ]
  return [`${gameResult.winner}${calWinRate(gameRecord[0])}`,`${gameResult.loser}${calWinRate(gameRecord[1])}`];
}

interface GameResult {
  winner: string
  loser: string
}

const  getGameResult = (game: String): GameResult => {
  const s = game.split(' ');
  const player1_hand = s.slice(1, 6);
  const player2_hand = s.slice(7);
  if (isFirstPlayerWin(player1_hand, player2_hand)) {
    return {
      winner: s[0],
      loser: s[6]
    }
  }
  return {
      winner: s[6],
      loser: s[0]
  }
}
const calWinRate = (game: GameRecord) => {
  const winCount = game.gameResults.filter(gameResult => gameResult == 'win').length;
  const gameCount = game.gameResults.length;

  return winCount / gameCount * 100;
}

export default getWinRate;
