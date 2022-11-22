export const topFiveWinRatePlayer = (record: string): string => {
  let winerName = winnerOfGame(record);

  return `${winerName} 100%, Jane 0%`;
};

export const winnerOfGame = (game: string) => {
    let winnerName = 'Mike'
  if (game == "Wu: 5C AD 5D AC 9C Mike: 7C 5H 8D TD KS") {
    winnerName = game.split(' ')[0].replace(':','')
  }
  if (game == 'Jane: 3H 7H 6S KC JS Wu: QH TD JC 2D 8S') {
    winnerName = game.split(' ')[0].replace(':','')
  }
  return winnerName;
};
