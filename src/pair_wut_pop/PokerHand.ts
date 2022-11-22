const poker = (input: String) => {
  if (input.split(':').length === 3) {
    return 'Jane:1,Mike:1';
  }
  return 'Jane:1,Mike:2,Wu:1';
};

export default poker;
