import { COUNTRY_CODE } from "../config";

export const removeCountryCode = (phone: string): string => {
  if (phone.startsWith(COUNTRY_CODE)) {
    return phone.slice(COUNTRY_CODE.length);
  }
  return phone;
};
