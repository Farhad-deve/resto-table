import { CancelButton, ChangeModal, SubmitButton } from "@/06-shared/ui";
import { Button, Group } from "@mantine/core";
import { Plus } from "lucide-react";
import { CreateRestaurantForm } from "./CreateRestaurantForm";
import { useDisclosure } from "@mantine/hooks";
import { useCreateRestaurant } from "@/05-entities/restaurant";
import { getErrorMessage } from "@/06-shared/utils";

export const CreateRestaurantButton = () => {
  const {
    mutate: createRestaurant,
    isPending: isCreatePending,
    isError: isCreateError,
    error: createError,
  } = useCreateRestaurant();
  const [
    changeModalOpened,
    { open: openChangeModal, close: closeChangeModal },
  ] = useDisclosure();

  return (
    <>
      <Button onClick={openChangeModal} leftSection={<Plus size={18} />}>
        Новый ресторан
      </Button>

      <ChangeModal
        opened={changeModalOpened}
        closeModal={closeChangeModal}
        title="Новый ресторан"
        isChangeLoading={isCreatePending}
        content={
          <CreateRestaurantForm
            onFormSubmit={(data) => {
              createRestaurant(data, {
                onSuccess: () => {
                  closeChangeModal();
                },
              });
            }}
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
                    onCancel={closeChangeModal}
                    cancelDisabled={isCreatePending}
                  />
                  <SubmitButton
                    children="Создать ресторан"
                    isSubmitLoading={isCreatePending}
                  />
                </Group>
              </Group>
            }
          />
        }
      />
    </>
  );
};
