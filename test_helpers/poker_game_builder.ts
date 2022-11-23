const highCardWithHighest = (rank: string) => `2H 3D 4D 5D ${rank}D`;
const diamondFlusHand = (rank: string) => `2D 3D 4D 5D 7D`;
const highCardWithKHeart = (rank: string) => `6H 4S 3C KH JS`;

type PlayerHand = {
  name?: string
  hand?: string
}
class GameBuilder{
  players: PlayerHand[] = [{}, {}];
  currentPlayer: number = 0

  between(name: string) {
    this.currentPlayer = 0
    this.players[this.currentPlayer].name = name
    return this;
  }
  vs(name: string) {
    this.currentPlayer+= 1
    this.players[this.currentPlayer].name = name

    return this;
  }
  highCardWithHighest(rank: string) {
    this.players[this.currentPlayer].hand = highCardWithHighest(rank)
    return this;
  }

  diamondFlusHand(rank: string) {
    this.players[this.currentPlayer].hand = diamondFlusHand(rank)
    return this;
  }

  highCardWithKHeart(rank: string) {
    this.players[this.currentPlayer].hand = highCardWithKHeart(rank)
    return this;
  }

  please() {
    return `${this.players[0].name}: ${this.players[0].hand} ${this.players[1].name}: ${this.players[1].hand}`
  }
}
  

const aGame = new GameBuilder()
export default aGame