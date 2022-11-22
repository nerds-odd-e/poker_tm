const getWinrate = (input: String) => {
  const s = input.split(' ');
  const slice = s.slice(0, 6);
  if (slice.toString().includes('A')) {
    return `${s[0]}100,${s[6]}0`;
  }
  return `${s[6]}100,${s[0]}0`;
};

export default getWinrate;
