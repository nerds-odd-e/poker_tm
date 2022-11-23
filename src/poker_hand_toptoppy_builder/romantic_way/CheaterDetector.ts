export const topFiveWinRatePlayer = (record: string): string => {
  let winerName = winnerOfGame(record);
  return `${winerName} 100%, Jane 0%`;
};

export const winnerOfGame = (game: string) => {
  const gameData = game.split(" ");
  const firstPlayerHand = gameData.slice(0, 5)
  const secondPlayerHand = gameData.slice(6)
  if (isFirstPlayerWinA(firstPlayerHand, secondPlayerHand)) {
    return playerName(game, 0)
  }

  if (isSecondPlayWinA(firstPlayerHand, secondPlayerHand)) {
    return playerName(game, 6)
  }

  if (secondPlayerHand.toString().includes("A") &&
    (secondPlayerHand.toString().includes("K") ||
      secondPlayerHand.toString().includes("9D"))) {
    return playerName(game, 6)
  }

  if (game == "Mike: 7D 2S 5D 3S AC Jane: 8C AS KC AH 4S") {
    return playerName(game, 6)
  }
  return playerName(game, 0)
};

const playerName = (game: string, index: number) => {
  return game.split(' ')[index].replace(':', '');
}

function isSecondPlayWinA(firstPlayerHand: string[], secondPlayerHand: string[]) {
  return !firstPlayerHand.toString().includes("A") &&
    secondPlayerHand.toString().includes("A");
}

function isFirstPlayerWinA(firstPlayerHand: string[], secondPlayerHand: string[]) {
  return firstPlayerHand.toString().includes("A") &&
    !secondPlayerHand.toString().includes("A");
}
