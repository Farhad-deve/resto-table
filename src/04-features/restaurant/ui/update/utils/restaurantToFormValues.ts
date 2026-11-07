import type { RestaurantWithAdmin } from "@/05-entities/restaurant";
import type { RestaurantFormData } from "../../../model/schemas";
import { removeCountryCode } from "@/06-shared/utils";

export const restaurantToFormValues = (
  data: RestaurantWithAdmin,
): Partial<RestaurantFormData> => {
  return {
    name: data.name,
    address: data.address,
    phone: removeCountryCode(data.phone),
    start_time: data.start_time.slice(0, 5),
    end_time: data.end_time.slice(0, 5),
  };
};
