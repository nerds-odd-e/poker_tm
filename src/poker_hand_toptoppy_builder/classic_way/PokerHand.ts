enum cardSuit {
  C = 'C',
  D = 'D',
  H = 'H',
  S = 'S',
}
enum pointOfCard {
  two = '2',
  three = '3',
  four = '4',
  five = '5',
  six = '6',
  seven = '7',
  eight = '8',
  nine = '9',
  ten ='T', 
  jeck = 'J', 
  queen = 'Q', 
  king = 'K', 
  ace = 'A'
}

export function isSameSuit(cards: string[]): boolean {
    console.log(cards[0][1]);
    console.log(cardSuit.S);

    return cards[0][1] == cardSuit.S

    // return true
}


