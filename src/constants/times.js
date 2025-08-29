export const TIMES = Array.from(
  { length: 48 },
  (_, i) =>
    `${String(Math.floor(i / 2)).padStart(2, '0')}:${String(i % 2 === 0 ? '00' : '30').padStart(2, '0')}`,
);

export const TIME_TO_INDEX = (() => {
  const m = new Map();
  TIMES.forEach((t, i) => m.set(t, i));
  return m;
})();
