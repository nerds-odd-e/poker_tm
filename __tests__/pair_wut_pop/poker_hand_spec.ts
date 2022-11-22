import getWinrate from '../../src/pair_wut_pop/PokerHand';

describe('winrate calculator', () => {
  it('should return Mike with 100% and Jane 0%', () => {
    expect(getWinrate('Jane: 8C TS KC 9H 4S Mike: 7D 2S 5D 3S AC')).toBe(
      'Mike:100,Jane:0'
    );
  });

  it('should return Wu with 100% and Mike 0%', () => {
    expect(getWinrate('Wu: 5C AD 5D AC 9C Mike: 7C 5H 8D TD KS')).toBe(
      'Wu:100,Mike:0'
    );
  });
});
