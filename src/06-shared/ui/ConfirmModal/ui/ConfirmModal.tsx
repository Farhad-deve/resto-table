import { ActionIcon, Button, Group, Modal, Stack, Text } from "@mantine/core";
import { X } from "lucide-react";

interface ConfirmModalProps {
  title: string;
  description: string;
  confirmButtonLabel: string;
  opened: boolean;
  isConfirmLoading: boolean;
  onConfirm: () => void;
  closeModal: () => void;
}

export const ConfirmModal = ({ title, description, onConfirm, opened, closeModal, isConfirmLoading, confirmButtonLabel }: ConfirmModalProps) => {
  return (
    <Modal
      padding={0}
      centered
      opened={opened}
      onClose={closeModal}
      withCloseButton={false}
      overlayProps={{
        backgroundOpacity: 0.35
      }}
      closeOnClickOutside={isConfirmLoading ? false : true}
      closeOnEscape={isConfirmLoading ? false : true}
    >
      <Stack>
        <Group justify="space-between" pt={16} px={24}>
          <Text fw={600} size="lg">
            {title}
          </Text>
          <ActionIcon variant="transparent" color="gray.5" onClick={closeModal} disabled={isConfirmLoading}>
            <X size={20} />
          </ActionIcon>
        </Group>

        <Text py={16} px={24} size="sm" c="#495057">
          {description}
        </Text>
      </Stack>

      <Group
        bg={"#f8f9fa"} gap={12} py={16} px={24}
        justify="flex-end" className="border-t border-[#e9ecef]"
      >
        <Button
          variant="outline"
          c="gray.7"
          className="border-[#dee2e6]!"
          size="sm"
          onClick={closeModal}
          disabled={isConfirmLoading}
        >
          Отмена
        </Button>
        <Button loading={isConfirmLoading} color="red" onClick={() => onConfirm()}>
          {confirmButtonLabel}
        </Button>
      </Group>
    </Modal>
  );
};
