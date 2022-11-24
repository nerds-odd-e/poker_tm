export function isSinglePair(game: string): Boolean {
  const firstHand = game.split(" ").slice(1, 6);
  const secondHand = game.split(" ").slice(7);
  return isHandSinglePair(firstHand) || isHandSinglePair(secondHand);
}

export function isTwoPair(game:string ):Boolean {
    return false;
}

export function isHandSinglePair(hand: string[]): boolean {
  const ranks = new Set(hand.map((card) => card.charAt(0)));
  return ranks.size == 4;
}

function isFlush(hands: string[]) {
  const firstSuit = hands[0];
  for (const suit of hands.slice(1)) {
    if (suit != firstSuit) {
      return false;
    }
  }
  return true;
}

function isStraight(hands: string[]) {
  const sortedHands = hands.map(e => e.replace('A','14')
  .replace('K','13')
  .replace('Q','12')
  .replace('J','11')
  .replace('T','10'))
  .map(e => parseInt(e)).sort();
  for(var i = 1; i < sortedHands.length; i++) {
    if(sortedHands[i] != sortedHands[0] + i) {
      return false;
    }
  }
  return true;
}

export function isThreeOfAKind(game: string): Boolean {
  const firstHand = game.split(" ").slice(1, 6);
  const secondHand = game.split(" ").slice(7);
  return isHandThreeOfAKind(firstHand) || isHandThreeOfAKind(secondHand);
}

function isHandThreeOfAKind(hand: string[]): boolean {
  const ranks = new Set(hand.map((card) => card.charAt(0)));
  return ranks.size == 3;
}


export default {
  isFlush,
  isStraight,
  isSinglePair,
  isThreeOfAKind
};
