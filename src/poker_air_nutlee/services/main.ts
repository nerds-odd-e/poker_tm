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
  const player2Name = playerSplitted[6].replace(":", "");
  return [
    { name: player1Name, winner: false },
    { name: player2Name, winner: true },
  ];
};

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
