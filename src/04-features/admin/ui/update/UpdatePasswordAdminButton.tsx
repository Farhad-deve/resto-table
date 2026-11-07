import { CancelButton, ChangeModal, SubmitButton } from "@/06-shared/ui";
import { Button, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Key } from "lucide-react";
import { UpdatePasswordAdminForm } from "./UpdatePasswordAdminForm";
import { useUpdatePasswordAdmin } from "@/05-entities/admin";
import { getErrorMessage } from "@/06-shared/utils";
import { toast } from "react-toastify";

interface UpdatePasswordAdminButtonProps {
  adminId: number;
  adminName: string;
}

export const UpdatePasswordAdminButton = ({ adminId, adminName } : UpdatePasswordAdminButtonProps) => {
  const {
    mutate: updatePassword,
    isPending: isUpdatePasswordPending,
    isError: isUpdatePasswordError,
    error: updatePasswordError,
  } = useUpdatePasswordAdmin();
  const [
    updatePasswordOpened,
    { open: updatePasswordOpen, close: updatePasswordClose },
  ] = useDisclosure();

  return (
    <>
      <Button
        leftSection={<Key size={14} />}
        variant="outline"
        color={"gray"}
        c={"gray.7"}
        size="xs"
        onClick={updatePasswordOpen}
      >
        <Text size="xs" fw={600}>
          Сменить пароль
        </Text>
      </Button>

      <ChangeModal
        title="Новый пароль"
        description={adminName}
        opened={updatePasswordOpened}
        closeModal={updatePasswordClose}
        content={
          <UpdatePasswordAdminForm
            children={
              <Group
                bg={"#f8f9fa"}
                gap={12}
                py={16}
                px={24}
                className="border-t border-[#e9ecef]"
              >
                <Group justify="flex-end" w={"100%"}>
                  <CancelButton
                    children="Отмена"
                    onCancel={updatePasswordClose}
                    cancelDisabled={isUpdatePasswordPending}
                  />
                  <SubmitButton
                    children="Сохранить"
                    isSubmitLoading={isUpdatePasswordPending}
                  />
                </Group>
              </Group>
            }
            errorMessage={isUpdatePasswordError ? getErrorMessage(updatePasswordError) : ""}
            onFormSubmit={(data) => {
              updatePassword({ id: adminId, data }, {
                onSuccess: () => {
                  updatePasswordClose();
                  toast.success("Пароль обновлён");
                }
              })
            }}
          />
        }
        isChangeLoading={isUpdatePasswordPending}
      />
    </>
  );
};
