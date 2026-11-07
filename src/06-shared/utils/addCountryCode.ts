import { COUNTRY_CODE } from "@/06-shared/config/consants";

export const addCountryCode = (phoneNumber: string): string => {
  return `${COUNTRY_CODE}${phoneNumber}`;
};
