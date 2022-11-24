export function isPair(game: string): Boolean {
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
