import { Group, Text } from "@mantine/core";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { NavLink } from "react-router";

interface SidebarLinkProps {
  path: string; 
  label: string;
  collapsed?: boolean;
  icon: LucideIcon;
  badge?: ReactNode;
}

export const SidebarLink = ({ path, label, collapsed, icon: Icon, badge } : SidebarLinkProps) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive
          ? "bg-[#099268] text-white rounded-lg"
          : "hover:bg-teal-50 rounded-lg text-[#495057]"
      }
    >
      <Group justify={`${!collapsed ? "space-between" : "center"}`} style={{ position: "relative" }} p={"xs"}>
        <Group gap={12}>
          <Icon size={16} />
          {!collapsed && (
            <Text size="xs" fw={600}>
              {label}
            </Text>
          )}
        </Group>
        {badge}
      </Group>
    </NavLink>
  );
};
