import getWinrate from '../../src/pair_wut_pop/PokerHand';

const highCardWithHighest = (rank: string) => `2H 3D 4D 5D ${rank}D`;

describe('winrate calculator', () => {
  it('should return empty when it input empty', () => {
    expect(
      getWinrate('')
    ).toBe('');
  });

  it('should return Mike with 100% and Jane 0%', () => {
    expect(
      getWinrate(
        `Jane: ${highCardWithHighest('K')} Mike: ${highCardWithHighest('A')}`
      )
    ).toBe('Mike:100,Jane:0');
  });

  it('should return Wu with 100% and Mike 0%', () => {
    expect(getWinrate('Wu: 5C AD 5D AC 9C Mike: 7C 5H 8D TD KS')).toBe(
      'Wu:100,Mike:0'
    );
  });

  it('should return Wu with 100% and Mike 0%', () => {
    expect(getWinrate('Mike: 7D 2S 5D 3S AC Wu: 5C AD 5D AH 9C')).toBe(
      'Wu:100,Mike:0'
    );
  });

  describe('Both Players got Equal A cards', () => {
    it('should return Wu (higher 9C) with 100% and Mike 0%', () => {
      expect(getWinrate('Wu: 5C AD 6D AC 9C Mike: 5D AH 5S AH 8S')).toBe(
        'Wu:100,Mike:0'
      );
    });

    it('should return Wu (higher 9C) with 100% and Mike 0% but diffrent position', () => {
      expect(getWinrate('Mike: 5D AH 5S AH 8S Wu: 5C AD 6D AC 9C')).toBe(
        'Wu:100,Mike:0'
      );
    });

    it('should return Wu (higher 6D) with 100% and Mike 0%', () => {
      expect(getWinrate('Wu: 5C AD 6D AC 9C Mike: 5D AH 5S AH 9S')).toBe(
        'Wu:100,Mike:0'
      );
    });
  });
});
