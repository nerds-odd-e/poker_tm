const highCardWithHighest = (rank: string) => `2H 3D 4D 5D ${rank}D`;
const diamondFlushHand = () => `2D 3D 4D 5D 7D`;
const highCardWithKHeart = () => `6H 4S 3C KH JS`;
const threeOfAKind = () => `7S 7H 7D 2H 3D`;
const pairCardInHand = () => `9S 9H 2H 3C 4S`;
const twoPairInHand = () => `KS KH 9D 9C 5H`;
const fullHouseInHand = () => `KS KH KC 7S 7H`;

type PlayerHand = {
  name?: string;
  hand?: string;
};
class GameBuilder {
  players: PlayerHand[] = [{}, {}];
  currentPlayer: number = 0;

  between(name: string) {
    this.currentPlayer = 0;
    this.players[this.currentPlayer].name = name;
    return this;
  }
  vs(name: string) {
    this.currentPlayer += 1;
    this.players[this.currentPlayer].name = name;

    return this;
  }
  highCardWithHighest(rank: string) {
    this.players[this.currentPlayer].hand = highCardWithHighest(rank);
    return this;
  }

  diamondFlushHand() {
    this.players[this.currentPlayer].hand = diamondFlushHand();
    return this;
  }

  highCardWithKHeart() {
    this.players[this.currentPlayer].hand = highCardWithKHeart();
    return this;
  }

  pairCardInHand() {
    this.players[this.currentPlayer].hand = pairCardInHand();
    return this;
  }

  twoPairInHand() {
    this.players[this.currentPlayer].hand = twoPairInHand();
    return this;
  }

  threeOfAKind() {
    this.players[this.currentPlayer].hand = threeOfAKind();
    return this;
  }

  fullHouseInHand() {
    this.players[this.currentPlayer].hand = fullHouseInHand();
    return this;
  }

  please() {
    return `${this.players[0].name}: ${this.players[0].hand} ${this.players[1].name}: ${this.players[1].hand}`;
  }
}

const aGame = new GameBuilder();
export default aGame;
