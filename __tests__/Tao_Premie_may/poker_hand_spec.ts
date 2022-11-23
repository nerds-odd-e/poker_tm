import getWinrate from '../../src/Tao_Premie_may/PokerHand';

const highCardWithHighest = (rank: string) => `2H 3D 4D 5D ${rank}D`;

class GameBuilder{
  player2HHand: string;
  highCardWithHighestPlayer2(rank: string) {
    this.player2HHand = highCardWithHighest(rank)
    return this;
  }
  player1Name?: string
  player1Hand?: string
  player2Name?: string;

  of(name: string) {
    this.player1Name = name
    return this;
  }
  vs(name: string) {
    this.player2Name = name
    return this;
  }
  highCardWithHighest(rank: string) {
    this.player1Hand = highCardWithHighest(rank)
    return this;
  }

  build() {
    return `${this.player1Name}: ${this.player1Hand} ${this.player2Name}: ${this.player2HHand}`
  }
}
  

const aGame = new GameBuilder()

describe('winrate calculator', () => {
  it('should return empty when it input empty', () => {
    expect(
      getWinrate('')
    ).toBe('');
  });

  it('should return Mike with 100% and Jane 0%', () => {
    expect(
      getWinrate(
        aGame.of("Jane").highCardWithHighest('K').vs("Mike").highCardWithHighestPlayer2("A").build()
      )
    ).toBe('Mike:100,Jane:0');
  });

  it('should return Wu with 100% and Mike 0%', () => {
    expect(getWinrate(`Wu: ${highCardWithHighest('A')} Mike: ${highCardWithHighest('K')}`)).toBe(
      'Wu:100,Mike:0'
    );
  });

  it('should return Wu with 100% and Mike 0%', () => {
    expect(getWinrate('Mike: 7D 2S 5D 3S AC Wu: 5C AD 5D AH 9C')).toBe(
      'Wu:100,Mike:0'
    );
  });

  it('should return Wu with 100% and Mike 0%', () => {
    expect(getWinrate('Mike: 7D 2S 5D 3S AC Wu: 5C AD 5D AH 9C,Jane: 5C AD 6D AC 9C Ken: 5D AH 5S KH 8S')).toBe(
      'Wu:100,Mike:0,Jane:100,Ken:0'
    );
  });

  it('should return Mike with 100% and Wu 0% and Jane with 100% and Ken 0%', () => {
    expect(getWinrate('Wu: 7D 2S 5D 3S AC Mike: 5C AD 5D AH 9C,Jane: 5C AD 6D AC 9C Ken: 5D AH 5S KH 8S')).toBe(
      'Mike:100,Wu:0,Jane:100,Ken:0'
    );
  });

  describe('Both Players got Equal A cards', () => {
    it('should return Wu (higher 9C) with 100% and Mike 0%', () => {
      expect(getWinrate('Wu: 5C AD 6D AC 9C Mike: 5D AH 3S AS 8S')).toBe(
        'Wu:100,Mike:0'
      );
    });

    xit('should return Wu (higher 9C) with 100% and Mike 0% but diffrent position', () => {
      expect(getWinrate('Mike: 5D AH 5S AH 8S Wu: 5C AD 6D AC 9C')).toBe(
        'Wu:100,Mike:0'
      );
    });

    it('should return Wu (higher 6D) with 100% and Mike 0%', () => {
      expect(getWinrate('Wu: 5C AD 6D AC 9C Mike: 5D AH 5S AH 9S')).toBe(
        'Wu:100,Mike:0'
      );
    });

    it('should return Wu (Royal flush) with 100% and Mike 0%', () => {
      expect(getWinrate('Wu: AC KC QC JC TC Mike: 5D AH 5S AS 9S')).toBe(
        'Mike:100,Wu:0'
      );
    });
  });
});
