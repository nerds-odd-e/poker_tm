const highCardWithHighest = (rank: string) => `2H 3D 4D 5D ${rank}D`;

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

  please() {
    return `${this.players[0].name}: ${this.players[0].hand} ${this.players[1].name}: ${this.players[1].hand}`
  }
}
  

const aGame = new GameBuilder()
export default aGame