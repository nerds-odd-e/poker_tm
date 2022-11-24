export function isPair(game: string): Boolean {
   const firstHand = game.split(" ").slice(1, 6)
   const secondHand = game.split(" ").slice(7)
  return false;
}

function isFlush(hands: Array<string>) {
  if (hands[1] != "D") {
    return false;
  }
  return true;
}

export default {
  isFlush,
  isPair,
};
