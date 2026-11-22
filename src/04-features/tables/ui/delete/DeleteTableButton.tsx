import { useDeleteTable, type Table } from "@/05-entities/tables"
import { ConfirmModal } from "@/06-shared/ui"
import { Button } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks";
import { Trash2 } from "lucide-react"
import { toast } from "react-toastify";

interface DeleteTableButtonProps {
  table: Table;
  closeDrawer: () => void;
  afterDelete: () => void;
  isDisabled: boolean;
}

export const DeleteTableButton = ({ table, closeDrawer, afterDelete, isDisabled }: DeleteTableButtonProps) => {
  const [confirmModalOpened, { open: openConfirmModal, close: closeConfirmModal }] = useDisclosure();
  const { mutate: deleteTable, isPending: isDeletePending } = useDeleteTable();

  return (
    <>
      <Button disabled={isDisabled} color="red" size="compact-lg" variant="outline" onClick={openConfirmModal}>
        <Trash2 size={18} />
      </Button>

      <ConfirmModal
        opened={confirmModalOpened}
        closeModal={closeConfirmModal}
        title={`Удалить стол ${table.number}?`}
        description="Брони на этот стол будут удалены. История заказов сохранится."
        confirmButtonLabel="Удалить"
        isConfirmLoading={isDeletePending}
        onConfirm={() => {
          deleteTable(table.id, {
            onSuccess: () => {
              closeConfirmModal();
              closeDrawer();
              afterDelete();
              toast.success(`Стол ${table.number} удалён.`);
            }
          })
        }}
      />
    </>
  )
}
