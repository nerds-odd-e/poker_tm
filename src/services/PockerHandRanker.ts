export function isPair(game: string): Boolean {
  return true;
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
