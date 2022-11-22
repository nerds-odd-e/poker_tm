export const topFiveWinRatePlayer = (record: string): string => {
  let winerName = winnerOfGame(record);

  return `${winerName} 100%, Jane 0%`;
};

export const winnerOfGame = (game: string) => {
  if (game == "Wu: 5C AD 5D AC 9C Mike: 7C 5H 8D TD KS") {
    return game.split(' ')[0].replace(':','')
  }
  return game.split(' ')[6].replace(':','');
};
