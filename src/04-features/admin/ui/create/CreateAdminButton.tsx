import { CancelButton, ChangeModal, SubmitButton } from "@/06-shared/ui";
import { Button, Group } from "@mantine/core";
import { CreateAdminForm } from "./CreateAdminForm";
import { Plus } from "lucide-react";
import { useDisclosure } from "@mantine/hooks";
import { useCreateAdmin } from "@/05-entities/admin";
import { getErrorMessage } from "@/06-shared/utils";
import { useRestaurants } from "@/05-entities/restaurant";
import { toast } from "react-toastify";

export const CreateAdminButton = () => {
  const [
    changeModalOpened,
    { open: openChangeModal, close: closeChangeModal },
  ] = useDisclosure();
  const {
    mutate: createAdmin,
    isPending: isCreatePending,
    isError: isCreateError,
    error: createError,
  } = useCreateAdmin();
  const { data: restaurants } = useRestaurants();
  const restaurantsWithoutAdmin = restaurants?.results.filter((r) => !r.admin);

  return (
    <>
      <Button onClick={openChangeModal} leftSection={<Plus size={18} />}>
        Новый администратор
      </Button>

      <ChangeModal
        title="Новый администратор"
        description="Он войдёт по телефону и паролю и сам настроит ресторан"
        opened={changeModalOpened}
        closeModal={closeChangeModal}
        content={
          <CreateAdminForm
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
                    children="Создать администратора"
                    isSubmitLoading={isCreatePending}
                    isDisabled={restaurantsWithoutAdmin?.length === 0}
                  />
                </Group>
              </Group>
            }
            onFormSubmit={(data) => {
              createAdmin(data, {
                onSuccess: () => {
                  closeChangeModal();
                  toast.success("Администратор создан и назначен");
                },
              });
            }}
            restaurantsWithoutAdmin={restaurantsWithoutAdmin ?? []}
          />
        }
        isChangeLoading={isCreatePending}
      />
    </>
  );
};
