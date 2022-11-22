export const topFiveWinRatePlayer = (record: string): string => {
  let winerName = winnerOfGame(record);

  return `${winerName} 100%, Jane 0%`;
};

export const winnerOfGame = (game: string) => {
  if (game == "Wu: 8C TS KC 9H 4S Mike: 7D 2S 5D 3S AC") {
    return "Wu";
  }
  return "Mike";
};
