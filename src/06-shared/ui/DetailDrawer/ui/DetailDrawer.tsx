import { Card, Drawer, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface DetailDrawerProps {
  emptyStateText: string;
  EmptyStateIcon: LucideIcon;
  content: ReactNode;
  actions: ReactNode;
  drawerTitle?: string;
  isDrawerOpen: boolean;
  onDrawerOpen: () => void;
  onDrawerClose: () => void;
}

export const DetailDrawer = ({
  emptyStateText,
  EmptyStateIcon,
  content,
  actions,
  drawerTitle,
  isDrawerOpen,
  onDrawerClose,
}: DetailDrawerProps) => {
  const isLgScreen = useMediaQuery("(min-width: 1200px)");

  return (
    <Card
      withBorder
      p={0}
      mih={380}
      style={{ position: "sticky", top: "5rem" }}
      className="hidden! lg:block!"
    >
      {!isDrawerOpen ? (
        <Stack gap={8} align="center" justify="center" h={380}>
          <EmptyStateIcon color="gray" size={24} />
          <Text ta={"center"} size="sm" lh={"sm"} c={"gray"}>
            {emptyStateText}
          </Text>
        </Stack>
      ) : (
        <Stack gap={0}>
          {content}

          {actions}
        </Stack>
      )}

      {!isLgScreen && (
        <Drawer
          title={drawerTitle}
          position="right"
          opened={isDrawerOpen}
          onClose={onDrawerClose}
          className=""
        >
          {content}
        </Drawer>
      )}
    </Card>
  );
};
