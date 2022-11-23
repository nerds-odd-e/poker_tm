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

const getWinrate = (game: String) => {
  if (game === '') {
    return '';
  }
  const rounds = game.split(',')
  const winners = rounds.map(round => getWinner(round))

  return winners.join(",");
};

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


const  getWinner = (game: String) => {
  let gameResult = getGameResult(game);
  return `${gameResult.winner}100,${gameResult.loser}0`;
}


export default getWinrate;
