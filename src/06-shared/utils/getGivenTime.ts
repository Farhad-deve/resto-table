export const getGivenTime = (time: string): string => {
  const today = new Date(time);
  return today.toLocaleTimeString("en-GB", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
};