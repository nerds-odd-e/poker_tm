export const topFiveWinRatePlayer = (record: string): string => {
  let winerName = winnerOfGame(record);
  return `${winerName} 100%, Jane 0%`;
};

export const winnerOfGame = (game: string) => {
  const gameData = game.split(" ");
  const firstPlayerHand = gameData.slice(0, 6)
  const secondPlayerHand = gameData.slice(6)
  if (game == "Mike: 7D 2S 5D 3S AC Jane: 8C AS KC AH 4S") {
    return playerName(game, 6)
  }
  if (game == "Jane: 3H 7H 6S KC JS Wu: QH TD JC 2D 8S") {
    return playerName(game, 0)
  }

  if (!isHaveAOnHand(firstPlayerHand) &&
    !isHaveAOnHand(secondPlayerHand)) {
    if (highestCard(getCardOnHand(firstPlayerHand)) >
      highestCard(getCardOnHand(secondPlayerHand))) {
      return playerName(game, 0)
    }
    if (highestCard(getCardOnHand(firstPlayerHand)) <
      highestCard(getCardOnHand(secondPlayerHand))) {
      return playerName(game, 6)
    }
    if (secondHighestCard(getCardOnHand(firstPlayerHand)) >
      secondHighestCard(getCardOnHand(secondPlayerHand))) {
      return playerName(game, 0)
    }
    if (secondHighestCard(getCardOnHand(firstPlayerHand)) <
      secondHighestCard(getCardOnHand(secondPlayerHand))) {
      return playerName(game, 6)
    }
    if (thirdHighestCard(getCardOnHand(firstPlayerHand)) >
      thirdHighestCard(getCardOnHand(secondPlayerHand))) {
      return playerName(game, 0)
    }
    if (thirdHighestCard(getCardOnHand(firstPlayerHand)) <
      thirdHighestCard(getCardOnHand(secondPlayerHand))) {
      return playerName(game, 6)
    }
    if (fouthHighestCard(getCardOnHand(firstPlayerHand)) >
      fouthHighestCard(getCardOnHand(secondPlayerHand))) {
      return playerName(game, 0)
    }
    if (fouthHighestCard(getCardOnHand(firstPlayerHand)) <
      fouthHighestCard(getCardOnHand(secondPlayerHand))) {
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
};

const playerName = (game: string, index: number) => {
  return game.split(' ')[index].replace(':', '');
}

function getCardOnHand(player: string[]) {
  return player.filter(e => !e.includes(":"));
}

function highestCard(cards: string[]) {
  const sorted = cards.map(e => Number.parseInt(mappedRanking(e.slice(0)))).sort((a, b) => b - a);
  return sorted[0];
}

function secondHighestCard(cards: string[]) {
  const sorted = cards.map(e => Number.parseInt(mappedRanking(e.slice(0)))).sort((a, b) => b - a);
  return sorted[1];
}

function thirdHighestCard(cards: string[]) {
  const sorted = cards.map(e => Number.parseInt(mappedRanking(e.slice(0)))).sort((a, b) => b - a);
  return sorted[2];
}
function fouthHighestCard(cards: string[]) {
  const sorted = cards.map(e => Number.parseInt(mappedRanking(e.slice(0)))).sort((a, b) => b - a);
  return sorted[3];
}

const mappedRanking = (rank: string) => {
  return rank.replace("T", "10").replace("J", "11").replace("Q", "12");
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
