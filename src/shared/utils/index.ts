const palindrome = (str: string): boolean => {
  const len = str.length;
  const mid = Math.floor(len / 2);

  for (let i = 0; i < mid; i += 1) {
    if (str[i] !== str[len - 1 - i]) {
      return false;
    }
  }

  return true;
};

export default palindrome;
