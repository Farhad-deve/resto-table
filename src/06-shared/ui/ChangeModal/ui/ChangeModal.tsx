import { ActionIcon, Group, Modal, Stack, Text } from "@mantine/core";
import { X } from "lucide-react";
import type { ReactNode } from "react";

interface ChangeModalProps {
  title: string;
  description?: string;
  content: ReactNode;
  opened: boolean;
  isChangeLoading?: boolean;
  closeModal: () => void;
}

export const ChangeModal = ({
  title,
  description,
  content,
  opened,
  isChangeLoading,
  closeModal,
}: ChangeModalProps) => {
  return (
    <Modal
      padding={0}
      centered
      opened={opened}
      onClose={closeModal}
      withCloseButton={false}
      overlayProps={{
        backgroundOpacity: 0.35,
      }}
      closeOnClickOutside={isChangeLoading ? false : true}
      closeOnEscape={isChangeLoading ? false : true}
    >
      <Stack>
        <Group justify="space-between" pt={16} px={24}>
          <Stack gap={0}>
            <Text fw={600} size="lg">
              {title}
            </Text>
            <Text size="xs" c="gray">
              {description}
            </Text>
          </Stack>
          <ActionIcon
            variant="transparent"
            color="gray.5"
            onClick={closeModal}
            disabled={isChangeLoading}
          >
            <X size={20} />
          </ActionIcon>
        </Group>

        <Stack>
          {content}
        </Stack>
      </Stack>
    </Modal>
  );
};
