export const formatAddress = (first, second, third) => {
  const parts = [first, second, third].filter(Boolean);

  const deduped = [];

  for (let i = 0; i < parts.length; i++) {
    const curr = parts[i];
    const prev = deduped[deduped.length - 1];

    if (curr === '전체') {
      continue;
    }

    // check if it already exists
    if (deduped.includes(curr)) {
      continue;
    }

    // if previous item exists and current item ends with "전체"
    if (prev && curr.endsWith(' 전체')) {
      // check if previous item is a substring of current item
      const prevNormalized = prev.replace(/\s+/g, '');
      const currWithoutJeonche = curr.replace(' 전체', '').replace(/\s+/g, '');

      if (prevNormalized === currWithoutJeonche) {
        // remove previous item and replace with current item (including "전체")
        deduped.pop();
        deduped.push(curr);
      } else {
        deduped.push(curr);
      }
    } else {
      // if current item is not "전체" check if "전체" version already exists
      const jeoncheeVersion = `${curr} 전체`;
      const existingJeoncheeIndex = deduped.findIndex((item) => item === jeoncheeVersion);

      if (existingJeoncheeIndex !== -1) {
        // if "전체" version already exists, don't add current item
        continue;
      } else {
        deduped.push(curr);
      }
    }
  }

  return deduped.join(' ');
};
