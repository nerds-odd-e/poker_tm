const totalACard = (cards: string[]) =>
  cards.filter((e) => e.includes("A")).length;

const isFirstPlayerWin = (player2_hand: string[], hand1: Hand) => {
  if (checkFlush(hand1.cards)) {
    return true;
  }
  return false;
};

const getWinrate = (gamesRaw: String) => {
  if (gamesRaw === "") {
    return "";
  }
  const rounds = gamesRaw.split(",");
  const winners = rounds.map((round) => getWinner(round));

  return winners.join(",");
};

class Hand {
  cards: string[];
  constructor(cards: string[]) {
    this.cards = cards;
  }
}
const getWinner = (gameRaw: String) => {
  const s = gameRaw.split(" ");
  const player1_hand = s.slice(1, 6);
  const player2_hand = s.slice(7);
  if (isFirstPlayerWin(player2_hand, new Hand(player1_hand))) {
    return `${s[0]}100,${s[6]}0`;
  }
  return `${s[6]}100,${s[0]}0`;
};

export default getWinrate;

function checkFlush(player1_hand: string[]): Boolean {
  const firstCharacter = player1_hand[0][1];
  player1_hand.forEach((card) => {
    if (card[1] != firstCharacter) {
      return false;
    }
  });
  return true;
}
