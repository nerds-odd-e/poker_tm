import * as fs from "fs";

function getGames(content:string){
  return  content
  .split(/\r?\n/)
}

export function getNames(fileName: string): Set<string> {
  if (!fs.existsSync(fileName)) {
    return new Set();
  }
  const content = fs.readFileSync(fileName, "utf8");
  return new Set(
    getGames(content).map(game => extractNames(game)).flatMap((array) => array)
  );
}

export function getNamesAndGamesCount(fileName: string): Map<string, number> {
  if (!fs.existsSync(fileName)) {
    return new Map();
  }

  const mapNameAndGame = new Map();
  const content = fs.readFileSync(fileName, "utf8");

  getGames(content)
    .forEach((game) => {
      extractNames(game).forEach((name)=>{
         if (mapNameAndGame.has(name)) {
        mapNameAndGame.set(name, mapNameAndGame.get(name) + 1);
      } else {
        mapNameAndGame.set(name, 1);
      }
      })
    });
  return mapNameAndGame;
}

export function extractNames(game: string): string[] {
  return game
    .split(/(\s)/)
    .filter((item) => item.endsWith(":"))
    .map((name) => name.substring(0, name.length - 1));
}

export function getNamesAndWinCount(fileName: string): Map<string, number> {
  if (!fs.existsSync(fileName)) {
    return new Map();
  }
  

  const allResults = new Map<string, number>();
  const content = fs.readFileSync(fileName, "utf8");
  getGames(content)
    .map((game) => getTheWinner(game))
    .forEach((winner) => {
      
      if (allResults.has(winner)) {
        const currentNumberOfWins = allResults.get(winner) as number;
        allResults.set(winner, currentNumberOfWins + 1);
      } 
      if (!allResults.has(winner)){
        allResults.set(winner, 1);
      }

    });

  return allResults;
}

interface Card {
  suit: string,
  value: string
}

interface Hand {
  cards: Set<Card>
}

export function getTheWinner(game: string): string {
  const cards = extractCards(game);
  const player = extractNames(game);
  if (getRankOfHand(cards[0]) < getRankOfHand(cards[1])) {
    return player[1]
  }
  return player[0]
}
export enum CardRank {
  Royal_Flush = 10,
  Straight_Flush = 9

}
export function extractCards(game: string): Array<string> {
  const cards = game
    .split(/(\s)/)
    .filter((item) => !item.endsWith(":") && item != ' ')
  return [
    cards.slice(0,5).join(' '),
    cards.slice(5,10).join(' ')]
}

export function getRankOfHand(cards: string): number {
  const sortedCard = sortCard(cards)
  if (sortedCard == 'TS JS QS KS AS') {
    return CardRank.Royal_Flush
  }
  if (sortedCard == '4H 5H 6H 7H 8H') {
    return CardRank.Straight_Flush
  }
  return 0
}

export function sortCard(card:string) {
  const arrayHandOne = card.split(" ");
  const sortedHand:Array<string> = []
  const suits = ["C", "D", "H", "S"];
  const ranks = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "T",
    "J",
    "Q",
    "K",
    "A"
  ];
  for (let i = 0; i < ranks.length; i++) {
    for (let j = 0; j < arrayHandOne.length; j++) {
      if (ranks[i] === arrayHandOne[j].charAt(0)) {
        sortedHand.push(arrayHandOne[j]);
      }
    }
  }

  return sortedHand.join(' ')
  
}

