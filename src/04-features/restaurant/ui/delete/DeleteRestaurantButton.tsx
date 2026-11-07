import {
  useDeleteRestaurant,
  type RestaurantWithAdmin,
} from "@/05-entities/restaurant";
import { ConfirmModal } from "@/06-shared/ui";
import { Button, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Trash } from "lucide-react";
import { toast } from "react-toastify";

interface DeleteRestaurantButtonProps {
  restaurant: RestaurantWithAdmin | null;
  closeDrawer: () => void;
}

export const DeleteRestaurantButton = ({ restaurant, closeDrawer }: DeleteRestaurantButtonProps) => {
  const { mutate: deleteRestaurant, isPending: isDeletePending } = useDeleteRestaurant();

  const [
    confirmModalOpened,
    { open: openConfirmModal, close: closeConfirmModal },
  ] = useDisclosure();

  return (
    <>
      <Button
        leftSection={<Trash size={14} />}
        color="red.8"
        variant="outline"
        c={"red.8"}
        onClick={openConfirmModal}
        size="xs"
      >
        <Text size="xs" fw={600}>
          Удалить ресторан
        </Text>
      </Button>

      <ConfirmModal
        title={`Удалить «${restaurant?.name}»?`}
        description="Меню, столы, склад, сотрудники, заказы, брони и администратор ресторана будут удалены без возможности восстановления. Чтобы временно скрыть ресторан, используйте «Деактивировать»"
        confirmButtonLabel="Удалить навсегда"
        opened={confirmModalOpened}
        closeModal={closeConfirmModal}
        onConfirm={() => {
          if (restaurant?.id !== undefined) {
            deleteRestaurant(restaurant.id, {
              onSuccess: () => {
                closeConfirmModal();
                closeDrawer();
                toast.success(`Ресторан ${restaurant.name} удален`);
              },
            });
          }
        }}
        isConfirmLoading={isDeletePending}
      />
    </>
  );
};
