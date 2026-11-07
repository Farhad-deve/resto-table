import type { RestaurantAdmin } from "@/05-entities/admin"
import type { UpdateAdminFormData } from "../../../model/schemas"
import { removeCountryCode } from "@/06-shared/utils"

export const adminToFormValues = (data: RestaurantAdmin): Partial<UpdateAdminFormData> => {
  return (
    {
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: removeCountryCode(data.phone_number),
    }
  )
}
