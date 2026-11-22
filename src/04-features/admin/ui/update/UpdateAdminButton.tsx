import { CancelButton, ChangeModal, SubmitButton } from "@/06-shared/ui";
import { Button, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Edit2 } from "lucide-react";
import { UpdateAdminForm } from "./UpdateAdminForm";
import { useUpdateAdmin, type RestaurantAdmin } from "@/05-entities/admin";
import { getErrorMessage } from "@/06-shared/utils";
import { adminToFormValues } from "./utils/adminToFormValues";
import { toast } from "react-toastify";

interface UpdateAdminButtonProps {
  oldData: RestaurantAdmin;
}

export const UpdateAdminButton = ({ oldData }: UpdateAdminButtonProps) => {
  const [updateOpened, { open: updateOpen, close: updateClose }] = useDisclosure();
  const {
    mutate: updateAdmin,
    isPending: isUpdatePending,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateAdmin();

  return (
    <>
      <Button
        leftSection={<Edit2 size={14} />}
        variant="outline"
        c={"gray.7"}
        color="gray"
        size="xs"
        onClick={updateOpen}
      >
        <Text size="xs" fw={600}>
          Редактировать
        </Text>
      </Button>

      <ChangeModal
        title={"Редактировать администратора"}
        opened={updateOpened}
        closeModal={updateClose}
        content={
          <UpdateAdminForm
            errorMessage={isUpdateError ? getErrorMessage(updateError) : ""}
            defaultData={adminToFormValues(oldData)}
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
                    onCancel={updateClose}
                    cancelDisabled={isUpdatePending}
                  />
                  <SubmitButton
                    children="Сохранить"
                    isSubmitLoading={isUpdatePending}
                  />
                </Group>
              </Group>
            }
            onFormSubmit={(data) => {
              updateAdmin(
                { id: oldData.id, data },
                {
                  onSuccess: () => {
                    updateClose();
                    toast.success("Изменения сохранены");
                  },
                },
              );
            }}
          />
        }
        isChangeLoading={isUpdatePending}
      />
    </>
  );
};
