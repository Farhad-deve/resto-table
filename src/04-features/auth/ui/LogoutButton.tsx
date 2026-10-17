import { ConfirmModal } from "@/06-shared/ui/ConfirmModal";
import { ActionIcon } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { LogOut } from "lucide-react";
import { useLogout } from "../model/useLogout";

export const LogoutButton = () => {
  const [opened, { open, close }] = useDisclosure();
  const { mutate: logout, isPending: isLogoutPending } = useLogout();

  return (
    <>
      <ActionIcon onClick={open} variant="transparent" color="#868E96" className="group">
        <LogOut size={16} className="group-hover:text-red-500" />
      </ActionIcon>

      <ConfirmModal
        title="Выйти из аккаунта?"
        description="Вы выйдете из системы на этом устройстве. Чтобы продолжить работу, нужно будет войти снова."
        confirmButtonLabel="Выйти"
        opened={opened}
        closeModal={close}
        isConfirmLoading={isLogoutPending}
        onConfirm={logout}
      />
    </>
  );
};
