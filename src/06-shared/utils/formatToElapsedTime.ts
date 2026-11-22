export const formatToElapsedTime = (time: string): string => {
    const milliseconds = Date.now() - new Date(time).getTime();
    const seconds = Math.floor(Math.max(milliseconds) / 1000);
    const minutes = Math.floor(seconds / 60);
    const minutesPast = minutes % 60;
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return `${hours} ч ${minutesPast} мин`;
    if (minutesPast > 0) return `${minutesPast} мин`;
    return "только что";
};
