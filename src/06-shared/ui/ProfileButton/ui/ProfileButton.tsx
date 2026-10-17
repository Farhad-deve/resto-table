import { Avatar, Group, Stack, Text } from "@mantine/core";
import type { ReactElement } from "react";


type User = {
  first_name: string;
  last_name: string;
  role: string;
};

interface ProfileButtonProps {
  user?: User;
  rightSection: ReactElement;
}

export const ProfileButton = ({ user, rightSection }: ProfileButtonProps) => {
  return (
    <Group
      className={`border-t border-[#E9ECEF] rounded-lg hover:bg-black/5`}
      justify="space-between"
    >
      <Group gap={12} className="flex-1 cursor-pointer py-2 px-1">
        <Avatar color="teal.8" size={"2.2rem"}>
          <Text c={"white"} size="sm" fw={600}>
            {user?.first_name.charAt(0).toUpperCase()}
            {user?.last_name.charAt(0).toUpperCase()}
          </Text>
        </Avatar>

        <Stack gap={0}>
          <Text size="sm" fw={600}>
            {user?.first_name} {user?.last_name}
          </Text>
          <Text size="xs" c={"gray.6"}>
            {user?.role === "superadmin"
              ? "Суперадминистратор"
              : user?.role === "restaurant_admin"
                ? "Администратор"
                : "Склад"}
            {/* Платформа | Администратор | Склад */}
          </Text>
        </Stack>
      </Group>

      {rightSection}
    </Group>
  );
};
