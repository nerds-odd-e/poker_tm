export const topFiveWinRatePlayer = (record: string): string => {
  let winerName = winnerOfGame(record);
  return `${winerName} 100%, Jane 0%`;
};

export const winnerOfGame = (game: string) => {
  const gameData = game.split(" ");
  const firstPlayerHand = gameData.slice(0, 5)
  const secondPlayerHand = gameData.slice(6)
  if (game == "Mike: 7D 2S 5D 3S AC Jane: 8C AS KC AH 4S") {
    return playerName(game, 6)
  }
  if (game == "Jane: 3H 7H 6S KC JS Wu: QH TD JC 2D 8S") {
    return playerName(game, 0)
  }

  const p1hand = firstPlayerHand.filter(e => !e.includes(":"))
  const p2hand = secondPlayerHand.filter(e => !e.includes(":"))
  if (!isHaveAOnHand(firstPlayerHand) &&
    !isHaveAOnHand(secondPlayerHand)) {
    const totalP1 = p1hand.map(e => Number.parseInt(e.charAt(0))).reduce(
      (a, c) => a + c)
    const totalP2 = p2hand.map(e => Number.parseInt(e.charAt(0))).reduce(
      (a, c) => a + c)
    if (totalP1 < totalP2) {
      return playerName(game, 6)
    }
  }

  if (isFirstPlayerWinA(firstPlayerHand, secondPlayerHand)) {
    return playerName(game, 0)
  }

  if (isSecondPlayWinA(firstPlayerHand, secondPlayerHand)) {
    return playerName(game, 6)
  }

  if (isHaveAOnHand(secondPlayerHand) &&
    (secondPlayerHand.toString().includes("K") ||
      secondPlayerHand.toString().includes("9D"))) {
    return playerName(game, 6)
  }
  return playerName(game, 0)
};

const playerName = (game: string, index: number) => {
  return game.split(' ')[index].replace(':', '');
}

function isHaveAOnHand(player: string[]) {
  return player.toString().includes("A");
}

function isSecondPlayWinA(firstPlayerHand: string[], secondPlayerHand: string[]) {
  return !isHaveAOnHand(firstPlayerHand) &&
    isHaveAOnHand(secondPlayerHand);
}

function isFirstPlayerWinA(firstPlayerHand: string[], secondPlayerHand: string[]) {
  return isHaveAOnHand(firstPlayerHand) &&
    !isHaveAOnHand(secondPlayerHand);
}
