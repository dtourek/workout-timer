export const msToTime = (ms: number) => {
  const hours = Math.floor(ms / 100 / 60 / 60);
  const minutes = Math.floor((ms / 100 / 60) % 60);
  const seconds = Math.floor((ms / 100) % 60);
  return { hours, minutes, seconds };
};
