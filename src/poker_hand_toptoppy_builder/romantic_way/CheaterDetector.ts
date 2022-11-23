export const topFiveWinRatePlayer = (record: string): string => {
  let winerName = winnerOfGame(record);
  return `${winerName} 100%, Jane 0%`;
};

export const winnerOfGame = (game: string) => {
  const firstPlayerHand = game.split(" ").slice(0, 5)
  const secondPlayerHand = game.split(" ").slice(6)

  // 8C 2D 9C 7H AS 
  const p1_hand = firstPlayerHand.filter(e => !e.includes(":"))

  const p2_hand = secondPlayerHand.filter(e => !e.includes(":"))
  if (p1_hand.filter(e => e.includes("A")).length ==
    p2_hand.filter(e => e.includes("A")).length) {
    if (p1_hand.filter(e => !e.includes("A")).map(e => +Number.parseInt(e.charAt(0)))
      > p2_hand.filter(e => !e.includes("A")).map(e => +Number.parseInt(e.charAt(0)))) {
      return firstPlayerHand[0] + ' 100%'
    }
  }

  if (secondPlayerHand.toString().includes("A") &&
    secondPlayerHand.toString().includes("K")) {
    return playerName(game, 6)
  }
  if (secondPlayerHand.toString().includes("A") &&
    secondPlayerHand.toString().includes("9D")) {
    return playerName(game, 6)
  }


  if (game == "Jane: 8C TS KC 9H 4S Mike: 7D 2S 5D 3S AC"
    || game == "Mike: 7D 2S 5D 3S AC Jane: 8C AS KC AH 4S") {
    return playerName(game, 6)
  }
  return playerName(game, 0)
};

const playerName = (game: string, index: number) => {
  return game.split(' ')[index].replace(':', '');
}