const totalACard = (cards: string[]) =>
  cards.filter((e) => e.includes("A")).length;

const isFirstPlayerWin = (hand1: Hand, hand2: Hand) => {
  // if (checkFlush(hand1.cards)) {
  //   return true;
  // }
  if (checkThreeOfAKind(hand1.cards)) {
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
  if (isFirstPlayerWin(new Hand(player1_hand), new Hand(player2_hand))) {
    return `${s[0]}100,${s[6]}0`;
  }
  return `${s[6]}100,${s[0]}0`;
};

export default getWinrate;

function checkFlush(player1_hand: string[]): Boolean {
  let shouldSkip = true;
  const firstCharacter = player1_hand[0][1];
  console.log(player1_hand);
  player1_hand.every((card) => {
    console.log(card[1], firstCharacter);
    if (card[1] != firstCharacter) {
      console.log(card[1]);
      shouldSkip = false;
      return;
    }
  });
  console.log("should skip =========", shouldSkip);

  return shouldSkip;
}
function checkThreeOfAKind(player1_hand: string[]): Boolean {
  const count = {};
  const listOfNumber = player1_hand.map((card) => {
    return card[0];
  });
  listOfNumber.forEach((number) => {
    count[number] = (count[number] || 0) + 1;
  });

  const setOfNumber = new Set(listOfNumber);
  console.log("-----------------", setOfNumber);
  for (let [key, value] of setOfNumber.entries()) {
    if (count[key] == 3) return true;
  }
  return false;
}
