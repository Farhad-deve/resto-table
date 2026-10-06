import type { Role } from "@/entities/user/model/types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const homeByRole: Record<Role, string> = {
    superAdmin: "/super-admin/restaurants",
    admin: "/admin/review",
    storekeeper: "/storage/review",
    chef: "/kitchen",
    waiter: "/waiter",
    klient: "/restaurants"  
};

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSuccess = (data: { }) => {

  }
}


