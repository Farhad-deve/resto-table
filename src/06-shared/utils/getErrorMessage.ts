import axios from "axios";

const generalRussianError = "Что-то пошло не так";

export const getErrorMessage = (error: unknown): string => {
  if (!axios.isAxiosError(error) || !error.response) return generalRussianError;
  const data: unknown = error.response.data;

  if (typeof data === "object" && data !== null) {
    if ("detail" in data && typeof data.detail === "string") return data.detail;

    const theFirstValueInObject = Object.values(data).at(0);
    if (Array.isArray(theFirstValueInObject)) {
      if (typeof theFirstValueInObject[0] === "string") return theFirstValueInObject[0];
    }
  }

  return generalRussianError;
};
