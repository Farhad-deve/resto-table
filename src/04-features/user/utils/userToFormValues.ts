import type { User } from "@/05-entities/user";
import type { UpdateUserFormData } from "../model/schemas";
import { removeCountryCode } from "@/06-shared/utils";

export const userToFormValues = (data: User): UpdateUserFormData => {
  return {
    first_name: data.first_name,
    last_name: data.last_name,
    phone_number: removeCountryCode(data.phone_number),
    email: data.email ?? "",
  };
};
