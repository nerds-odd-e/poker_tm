import getWinRate from '../../src/pair_wut_pop/PokerHand';

const highCardWithHighest = (rank: string) => `2H 3D 4D 5D ${rank}D`;

describe('winrate calculator', () => {
  it('should return empty when it input empty', () => {
    expect(
      getWinRate('')
    ).toBe('');
  });

  it('should return Mike with 100% and Jane 0%', () => {
    expect(
      getWinRate(
        `Jane: ${highCardWithHighest('K')} Mike: ${highCardWithHighest('A')}`
      )
    ).toBe('Mike:100,Jane:0');
  });

  it('should return Wu with 100% and Mike 0%', () => {
    expect(getWinRate('Wu: 5C AD 5D AC 9C Mike: 7C 5H 8D TD KS')).toBe(
      'Wu:100,Mike:0'
    );
  });

  it('should return Wu with 100% and Mike 0%', () => {
    expect(getWinRate('Mike: 7D 2S 5D 3S AC Wu: 5C AD 5D AH 9C')).toBe(
      'Wu:100,Mike:0'
    );
  });

  it('should return Wu with 100% and Mike 0%', () => {
    expect(getWinRate('Mike: 7D 2S 5D 3S AC Wu: 5C AD 5D AH 9C,Jane: 5C AD 6D AC 9C Ken: 5D AH 5S KH 8S')).toBe(
      'Wu:100,Mike:0,Jane:100,Ken:0'
    );
  });

  it('should return Mike with 100% and Wu 0% and Jane with 100% and Ken 0%', () => {
    expect(getWinRate('Wu: 7D 2S 5D 3S AC Mike: 5C AD 5D AH 9C,Jane: 5C AD 6D AC 9C Ken: 5D AH 5S KH 8S')).toBe(
      'Mike:100,Wu:0,Jane:100,Ken:0'
    );
  });

  it('should return Mike with 100% and Wu 0% and Jane with 100% and Ken 0%', () => {
    expect(getWinRate('Mike: 5C AD 5D AH 9C Wu: 7D 2S 5D 3S AC,Jane: 5C AD 6D AC 9C Ken: 5D AH 5S KH 8S')).toBe(
      'Mike:100,Wu:0,Jane:100,Ken:0'
    );
  });

  it('should return Mike with 100% and Wu 0% and Jane with 100%', () => {
    expect(getWinRate('Mike: 5C AD 5D AH 9C Wu: 7D 2S 5D 3S AC,Jane: 5C AD 6D AC 9C Wu: 5D AH 5S KH 8S')).toBe(
      'Mike:100,Wu:0,Jane:100'
    );
  });

  describe('Both Players got Equal A cards', () => {
    it('should return Wu (higher 9C) with 100% and Mike 0%', () => {
      expect(getWinRate('Wu: 5C AD 6D AC 9C Mike: 5D AH 3S AS 8S')).toBe(
        'Wu:100,Mike:0'
      );
    });

    it('should return Wu (higher 9C) with 100% and Mike 0% but diffrent position', () => {
      expect(getWinRate('Mike: 5D AH 5S AH 8S Wu: 5C AD 6D AC 9C')).toBe(
        'Wu:100,Mike:0'
      );
    });

    it('should return Wu (higher 6D) with 100% and Mike 0%', () => {
      expect(getWinRate('Wu: 5C AD 6D AC 9C Mike: 5D AH 5S AH 9S')).toBe(
        'Wu:100,Mike:0'
      );
    });

    it('should return Wu (Royal flush) with 100% and Mike 0%', () => {
      expect(getWinRate('Wu: AC KC QC JC TC Mike: 5D AH 5S AS 9S')).toBe(
        'Mike:100,Wu:0'
      );
    });
  });
});
