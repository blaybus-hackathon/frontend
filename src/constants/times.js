export const TIMES = Array.from(
  { length: 48 },
  (_, i) =>
    `${String(Math.floor(i / 2)).padStart(2, '0')}:${String(i % 2 === 0 ? '00' : '30').padStart(2, '0')}`,
);
