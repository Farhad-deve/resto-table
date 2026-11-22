export const getCurrentTime = (): string => {
  const today = new Date();
  return today.toLocaleTimeString("en-GB", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
};
