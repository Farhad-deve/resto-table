import { ConfirmModal } from "@/06-shared/ui";
import { ActionIcon, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { LogOut } from "lucide-react";
import { useLogout } from "../model/hooks";

interface LogoutButtonProps {
  logoutWithText?: boolean;
}

export const LogoutButton = ({ logoutWithText } : LogoutButtonProps) => {
  const [opened, { open, close }] = useDisclosure();
  const { mutate: logout, isPending: isLogoutPending } = useLogout();

  return (
    <>
      {logoutWithText ? (
        <Button onClick={open} variant="outline" bdrs={"sm"} color="red" leftSection={<LogOut size={16} />}>
          Выйти из аккаунта
        </Button>
      ) : (
        <ActionIcon onClick={open} variant="transparent" color="#868E96" className="group">
          <LogOut size={16} className="group-hover:text-red-500" />
        </ActionIcon>
      )}

      <ConfirmModal title="Выйти из аккаунта?"
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
