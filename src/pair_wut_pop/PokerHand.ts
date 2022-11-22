const isFirstPlayerWin = (player1_hand: string[], player2_hand: string[]) => {
  if (
    player1_hand.filter((e) => e.includes('A')).length >
    player2_hand.filter((e) => e.includes('A')).length
  ) {
    return true;
  }
  if (
    player1_hand.filter((e) => e.includes('A')).length ==
    player2_hand.filter((e) => e.includes('A')).length
  ) {
    return (
      Math.max(
        ...player1_hand
          .filter((e) => !e.includes('A'))
          .map((e) => Number.parseInt(e.charAt(0)))
      ) >
      Math.max(
        ...player2_hand
          .filter((e) => !e.includes('A'))
          .map((e) => Number.parseInt(e.charAt(0)))
      )
    );
  }
  return false;
};

const getWinrate = (input: String) => {
  const s = input.split(' ');
  const player1_hand = s.slice(1, 6);
  const player2_hand = s.slice(7);
  if (isFirstPlayerWin(player1_hand, player2_hand)) {
    return `${s[0]}100,${s[6]}0`;
  }
  return `${s[6]}100,${s[0]}0`;
};

export default getWinrate;
