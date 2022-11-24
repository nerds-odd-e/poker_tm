
export function isPair(hand: string): Boolean {
  return true;
}

function isFlush(hands : Array<string>) {
    // const coutSuit = 0
    // hands.forEach((value,index)=>{
    //     if(hands[0] == hands[index]){
    //         coutSuit += 1;
    //     }
    // })
    if(hands[1] != 'D'){
        return false;
    }
    return true;
}

export default { 
    isFlush, 
    isPair 
};
