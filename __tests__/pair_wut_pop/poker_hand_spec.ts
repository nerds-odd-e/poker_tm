import poker from '../../src/pair_wut_pop/PokerHand';

describe('poker hand', () => {
  it('should return player rounds base on the the round they were play', () => {
    expect(poker('Jane: 8C TS KC 9H 4S Mike: 7D 2S 5D 3S AC')).toBe('Jane:1,Mike:1');
  });

  it('should return A:2,B:1,C:1',() =>{
    expect(poker(`Jane: 8C TS KC 9H 4S Mike: 7D 2S 5D 3S AC
    Wu: 5C AD 5D AC 9C Mike: 7C 5H 8D TD KS`)).toBe('Jane:1,Mike:2,Wu:1');
  });
});
