import { CancelButton, ChangeModal, SubmitButton } from "@/06-shared/ui";
import { Button, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Pencil } from "lucide-react";
import { useUpdateTable, type Table } from "@/05-entities/tables";
import { UpdateTableForm } from "./UpdateTableForm";
import { tableToFormValues } from "./utils/tableToFormValues";
import { getErrorMessage } from "@/06-shared/utils";
import { toast } from "react-toastify";

interface UpdateTableButtonProps {
  oldData: Table;
}

export const UpdateTableButton = ({ oldData }: UpdateTableButtonProps) => {
  const [
    updateModalOpened,
    { open: openUpdateModal, close: closeUpdateModal },
  ] = useDisclosure();
  const {
    mutate: updateTable,
    isPending: isUpdatePending,
    isError: isUpdateError,
    error: updateError,
    reset: resetUpdate,
  } = useUpdateTable(oldData.id);

  function handleClose() {
    resetUpdate();
    closeUpdateModal();
  }

  return (
    <>
      <Button
        size="sm"
        leftSection={<Pencil size={16} />}
        variant="outline"
        color="gray"
        c="dark"
        w="100%"
        onClick={openUpdateModal}
      >
        Изменить
      </Button>

      <ChangeModal
        opened={updateModalOpened}
        closeModal={handleClose}
        title={`Стол ${oldData.number}`}
        content={
          <UpdateTableForm
            defaultData={tableToFormValues(oldData)}
            errorMessage={isUpdateError ? getErrorMessage(updateError) : ""}
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
                    onCancel={handleClose}
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
              updateTable(data, {
                onSuccess: () => {
                  handleClose();
                  toast.success("Стол обновлён");
                },
              });
            }}
          />
        }
        isChangeLoading={isUpdatePending}
      />
    </>
  );
};
