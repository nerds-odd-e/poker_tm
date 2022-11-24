export function isPair(game: string): Boolean {
   const firstHand = game.split(" ").slice(1, 6)
   const secondHand = game.split(" ").slice(7)
  return isHandPair(firstHand) || isHandPair(secondHand);
}

export function isHandPair(hand: string[]): boolean {
    return false;
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



export default {
  isFlush,
  isPair
};
