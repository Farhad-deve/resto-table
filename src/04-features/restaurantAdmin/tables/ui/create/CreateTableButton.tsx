import { CancelButton, ChangeModal, SubmitButton } from "@/06-shared/ui";
import { Button, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Plus } from "lucide-react";
import { CreateTableForm } from "./CreateTableForm";
import { useCreateTable } from "@/05-entities/restaurantAdmin";
import { useMyRestaurantId } from "@/05-entities/user";
import { getErrorMessage } from "@/06-shared/utils";
import { toast } from "react-toastify";

interface CreateTableButtonProps {}

export const CreateTableButton = ({}: CreateTableButtonProps) => {
  const [
    createModalOpened,
    { open: openCreateModal, close: closeCreateModal },
  ] = useDisclosure();
  const restId = useMyRestaurantId();
  const {
    mutate: createTable,
    isPending: isCreatePending,
    isError: isCreateError,
    error: createError,
  } = useCreateTable(restId);

  return (
    <>
      <Button
        onClick={openCreateModal}
        leftSection={<Plus size={16} />}
        color="teal.8"
      >
        Добавить стол
      </Button>

      <ChangeModal
        title="Новый стол"
        opened={createModalOpened}
        closeModal={closeCreateModal}
        content={
          <CreateTableForm
            errorMessage={isCreateError ? getErrorMessage(createError) : ""}
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
                    onCancel={closeCreateModal}
                    cancelDisabled={isCreatePending}
                  />
                  <SubmitButton
                    children="Добавить"
                    isSubmitLoading={isCreatePending}
                  />
                </Group>
              </Group>
            }
            onFormSubmit={(data) => {
              const body = {
                seats: data.seats,
                ...(data.number !== "" && { number: Number(data.number) }),
              }
              createTable(body, {
                onSuccess: () => {
                  closeCreateModal();
                  toast.success("Стол добавлен");
                }
              })
            }}
          />
        }
        isChangeLoading={isCreatePending}
      />
    </>
  );
};
