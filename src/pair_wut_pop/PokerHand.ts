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

const  getWinner = (game: String) => {
  const s = game.split(' ');
  const player1_hand = s.slice(1, 6);
  const player2_hand = s.slice(7);

  let gameResult
  if (isFirstPlayerWin(player1_hand, player2_hand)) {
    gameResult = {
      playerNames: [s[0], s[6]]
    }
    return `${gameResult.playerNames[0]}100,${gameResult.playerNames[1]}0`;
  }
  else {
   gameResult = {
    playerNames: [s[6], s[0]]
  }
}
  return `${gameResult.playerNames[0]}100,${gameResult.playerNames[1]}0`;
}


export default getWinrate;
