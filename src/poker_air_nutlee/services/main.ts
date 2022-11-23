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

function getResult(game: string) {
  const playerSplitted = game.split(" ");

  const firstPlayerName = playerSplitted[0].replace(":", "");
  const firstHand = playerSplitted.slice(1, 6);
  const firstHandHighestCard = highestCardInHand(firstHand);

  const secondPlayerName = playerSplitted[6].replace(":", "");
  const secondHand = playerSplitted.slice(7);
  const secondHandHighestCard = highestCardInHand(secondHand);

  const firstPlayerWin =
    compareCards(firstHandHighestCard, secondHandHighestCard) > 0;

  return [
    { name: firstPlayerName, winner: firstPlayerWin },
    { name: secondPlayerName, winner: !firstPlayerWin },
  ];
}

function highestCardInHand(hand: string[]): Card {
  return hand
    .map((c) => new Card(c))
    .sort(compareCards)
    .pop() as Card;
}

export class Card {
  value: CardValue;
  suit: Suit;

  constructor(card: string) {
    this.value = card.charAt(0) as CardValue;
    this.suit = card.charAt(1) as Suit;
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
}

enum CardValue {
  TWO = "2",
  THREE = "3",
  FOUR = "4",
  FIVE = "5",
  SIX = "6",
  SEVEN = "7",
  EIGHT = "8",
  NINE = "9",
  TEN = "T",
  JECK = "J",
  QUEEN = "Q",
  KING = "K",
  ACE = "A",
}

enum Suit {
  C = "C",
  D = "D",
  H = "H",
  S = "S",
}

export function compareCards(card1: Card, card2: Card): number {
  if (card1.valueAsNumber() > card2.valueAsNumber()) {
    return 1;
  }
  if (card1.valueAsNumber() < card2.valueAsNumber()) {
    return -1;
  }

  return compareSuits(card1.suit, card2.suit);
}

function compareValues(v1: CardValue, v2: CardValue): number {
    if (Object.keys(CardValue).indexOf(v1) > Object.keys(CardValue).indexOf(v2)) {
        return 1;
      }
    
      if (Object.keys(CardValue).indexOf(v1) < Object.keys(CardValue).indexOf(v2)) {
        return -1;
      }
    
      return 0;
}

function compareSuits(s1: Suit, s2: Suit): number {
  if (Object.keys(Suit).indexOf(s1) > Object.keys(Suit).indexOf(s2)) {
    return 1;
  }

  if (Object.keys(Suit).indexOf(s1) < Object.keys(Suit).indexOf(s2)) {
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
