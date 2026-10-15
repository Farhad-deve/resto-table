import { Group, Text } from "@mantine/core";
import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router";

interface SidebarLinkProps {
    path: string; 
    label: string;
    collapsed?: boolean;
    icon: LucideIcon
}

export const SidebarLink = ({ path, label, collapsed, icon: Icon } : SidebarLinkProps) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive
          ? "bg-[#099268] text-white rounded-lg"
          : "hover:bg-teal-50 rounded-lg text-[#495057]"
      }
    >
      <Group justify={`${collapsed && "center"}`} gap={12} p={"xs"}>
        <Icon size={16} />
        {!collapsed && (
          <Text size="xs" fw={600}>
            {label}
          </Text>
        )}
      </Group>
    </NavLink>
  );
};
