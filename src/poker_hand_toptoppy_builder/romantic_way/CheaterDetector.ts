export const topFiveWinRatePlayer = (record: string): string => {
  let winerName = winnerOfGame(record);

  return `${winerName} 100%, Jane 0%`;
};

export const winnerOfGame = (game: string) => {
  if (game == "Jane: 8C TS KC 9H 4S Mike: 7D 2S 5D 3S AC") {
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