export function isPair(game: string): Boolean {
  const firstHand = game.split(" ").slice(1, 6);
  const secondHand = game.split(" ").slice(7);
  return isHandPair(firstHand) || isHandPair(secondHand);
}

export function isHandPair(hand: string[]): boolean {
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
  return true;
}


export default {
  isFlush,
  isStraight,
  isPair
};
