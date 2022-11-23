const totalACard = (cards: string[]) =>
  cards.filter((e) => e.includes("A")).length;

const isFirstPlayerWin = (player1_hand1: string[], player2_hand: string[], hand1: Hand) => {
  if (totalACard(hand1.cards) > totalACard(player2_hand)) {
    return true;
  }
  if (totalACard(hand1.cards) == totalACard(player2_hand)) {
    const p1 = hand1.cards
      .filter((e) => !e.includes("A"))
      .map((e) => Number.parseInt(e.charAt(0)));
    const p2 = player2_hand
      .filter((e) => !e.includes("A"))
      .map((e) => Number.parseInt(e.charAt(0)));
    return p1.reduce((a, b) => a + b) > p2.reduce((a, b) => a + b);
  }
  const isCheckRoyalFlush = checkRoyalFlush(hand1.cards, player2_hand);
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
      this.cards = cards
    }
}
const getWinner = (gameRaw: String) => {
  const s = gameRaw.split(" ");
  const player1_hand = s.slice(1, 6);
  const player2_hand = s.slice(7);
  if (isFirstPlayerWin(player1_hand, player2_hand, new Hand(player1_hand))) {
    return `${s[0]}100,${s[6]}0`;
  }
  return `${s[6]}100,${s[0]}0`;
};

export default getWinrate;

function checkRoyalFlush(player1_hand: string[], player2_hand: string[]) {
  const firstCharacter = player1_hand[0][1];
player1_hand.forEach((card) => {
  if (card[1] != firstCharacter) {
    console.log("debug");
    return false
  }
  return true
})
}
