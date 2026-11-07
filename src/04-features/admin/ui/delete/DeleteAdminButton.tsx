import { useDeleteAdmin, type RestaurantAdmin } from "@/05-entities/admin";
import { ConfirmModal } from "@/06-shared/ui";
import { Button, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Trash } from "lucide-react";

interface DeleteAdminButtonProps {
  admin: RestaurantAdmin;
  closeDrawer: () => void;
}

export const DeleteAdminButton = ({ admin, closeDrawer }: DeleteAdminButtonProps) => {
  const { mutate: deleteAdmin, isPending: isDeletePending } = useDeleteAdmin();
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
          Удалить администратора
        </Text>
      </Button>

      <ConfirmModal
        title={`Удалить администратора?`}
        description={`
            ${admin?.first_name} ${admin?.last_name} сразу потеряет доступ к
            «${admin?.restaurant_name}». Аккаунт будет удалён.
        `}
        confirmButtonLabel="Удалить"
        opened={confirmModalOpened}
        closeModal={closeConfirmModal}
        onConfirm={() => {
          if (admin?.id !== undefined) {
            deleteAdmin(admin.id, {
              onSuccess: () => {
                closeConfirmModal();
                closeDrawer();
              },
            });
          }
        }}
        isConfirmLoading={isDeletePending}
      />
    </>
  );
};
