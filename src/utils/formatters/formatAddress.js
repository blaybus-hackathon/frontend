export const formatAddress = (first, second, third) => {
  const parts = [first, second, third].filter(Boolean);

  const deduped = [];

  for (let i = 0; i < parts.length; i++) {
    const curr = parts[i];
    const prev = deduped[deduped.length - 1];

    if (prev && curr === `${prev} 전체`) {
      deduped.pop();
      deduped.push(curr);
    } else if (curr === '전체') {
      continue;
    } else {
      deduped.push(curr);
    }
  }

  return deduped.join(' ');
};
