class PlayerStatistics {
  name: string;
  winCount: number;
  gameCount: number;
  winRate: number;
}

class GameResult {
  name: string;
  winner: boolean;
}

export function play(game: string) {
  const statistics: PlayerStatistics[] = [];
  playWithStatistics(game, statistics);
  return statistics;
}

export function process(games: string[]): PlayerStatistics[] {
  const statistics: PlayerStatistics[] = [];
  games.forEach((game) => {
    playWithStatistics(game, statistics);
  });
  return statistics;
}

function playWithStatistics(game: string, statistics: PlayerStatistics[]) {
  const gameResult = getResult(game) as GameResult[];

  const player1 = statistics.find(
    (player) => player.name === gameResult[0].name
  ) as PlayerStatistics;
  statistics.push(getPlayerResult(player1, gameResult[0]));

  const player2 = statistics.find(
    (player) => player.name === gameResult[1].name
  ) as PlayerStatistics;
  statistics.push(getPlayerResult(player2, gameResult[1]));
}

const getResult = (game: string) => {
  const playerSplitted = game.split(" ");

  const player1Name = playerSplitted[0].replace(":", "");
  const play1Hand = playerSplitted.slice(1, 6);
  const highestCardInHand1 = play1Hand
    .map((c) => new Card(c))
    .sort(compareCards)
    .pop() as Card;

  const player2Name = playerSplitted[6].replace(":", "");
  const play2Hand = playerSplitted.slice(7);
  const highestCardInHand2 = play2Hand
    .map((c) => new Card(c))
    .sort(compareCards)
    .pop() as Card;

  const player1win = compareCards(highestCardInHand1, highestCardInHand2) > 0;

  return [
    { name: player1Name, winner: player1win },
    { name: player2Name, winner: !player1win },
  ];
};

export class Card {
  value: string;
  suit: string;

  constructor(card: string) {
    this.value = card.charAt(0);
    this.suit = card.charAt(1);
  }

  valueAsNumber(): number {
    switch (this.value) {
      case "A":
        return 14;
      case "K":
        return 13;
      case "Q":
        return 12;
      case "J":
        return 11;
      case "T":
        return 10;
      default:
        return parseInt(this.value);
    }
  }

  suitAsNumber(): number {
    switch (this.suit) {
      case "S":
        return 4;
      case "H":
        return 3;
      case "D":
        return 2;
      case "C":
        return 1;
      default:
        return 0;
    }
  }
}

export function compareCards(card1: Card, card2: Card): number {
  if (card1.valueAsNumber() > card2.valueAsNumber()) {
    return 1;
  }
  if (card1.valueAsNumber() < card2.valueAsNumber()) {
    return -1;
  }

  if (card1.suitAsNumber() > card2.suitAsNumber()) {
    return 1;
  }

  if (card1.suitAsNumber() < card2.suitAsNumber()) {
    return -1;
  }

  return 0;
}

const getPlayerResult = (
  playerStatistics: PlayerStatistics,
  gameResult: GameResult
) => {
  if (playerStatistics) {
    playerStatistics.gameCount++;
    playerStatistics.winCount = gameResult.winner
      ? playerStatistics.winCount + 1
      : playerStatistics.winCount;
    playerStatistics.winRate =
      (playerStatistics.winCount / playerStatistics.gameCount) * 100;
    return playerStatistics;
  } else {
    const playerData = {
      name: gameResult.name,
      winCount: gameResult.winner ? 1 : 0,
      gameCount: 1,
      winRate: gameResult.winner ? 100 : 0,
    };
    return playerData;
  }
};
