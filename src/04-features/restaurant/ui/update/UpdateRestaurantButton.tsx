import { Button, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Edit2 } from "lucide-react";
import { UpdateRestaurantForm } from "./UpdateRestaurantForm";
import { useUpdateRestaurant, type RestaurantWithAdmin } from "@/05-entities/restaurant";
import { getErrorMessage } from "@/06-shared/utils";
import { CancelButton, ChangeModal, SubmitButton } from "@/06-shared/ui";
import { restaurantToFormValues } from "./utils/restaurantToFormValues";
import { toast } from "react-toastify";

interface UpdateRestaurantButtonProps {
  oldData: RestaurantWithAdmin;
}

export const UpdateRestaurantButton = ({ oldData }: UpdateRestaurantButtonProps) => {
  const {
    mutate: updateRestaurant,
    isPending: isUpdatePending,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateRestaurant();

  const [updateOpened, { open: updateOpen, close: updateClose }] = useDisclosure();

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
        title="Редактировать ресторан"
        opened={updateOpened}
        closeModal={updateClose}
        content={
          <UpdateRestaurantForm
            errorMessage={isUpdateError ? getErrorMessage(updateError) : ""}
            defaultData={restaurantToFormValues(oldData)}
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
              updateRestaurant(
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
