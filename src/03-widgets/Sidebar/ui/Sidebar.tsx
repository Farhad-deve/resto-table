import {
  ActionIcon,
  Avatar,
  Box,
  Group,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { LogOut, Store } from "lucide-react";
import {
  RestaurantAdminLinks,
  StoreKeeperLinks,
  SuperAdminLinks,
} from "../config/LinksData";
import { SidebarLink } from "./SidebarLink";
import { useLogout } from "@/04-features/auth";
import { useMe } from "@/05-entities/user";

interface SidebarProps {
  collapsed: boolean;
  inActiveRestaurantsCount?: number;
}

export const Sidebar = ({
  inActiveRestaurantsCount,
  collapsed,
}: SidebarProps) => {
  const { mutate: logout, isPending: isLogoutPending } = useLogout();
  const { data: user, isPending: isUserPending } = useMe();

  const RestaurantAdminHallLinks = RestaurantAdminLinks.filter(
    (link) => link.category === "Зал",
  );
  const RestaurantAdminControlLinks = RestaurantAdminLinks.filter(
    (link) => link.category === "Управление",
  );

  return (
    <div className={`h-full`}>
      <Stack h={"100%"} justify="space-between">
        <Stack h={"100%"} flex={1}>
          <Stack gap={4}>
            <Group p={"xs"} gap={"xs"} justify={`${collapsed && "center"}`}>
              <img
                src="/favicon.svg"
                alt="RestoTable"
                className="pointer-events-none"
              />
              {!collapsed && (
                <Text fw={600}>
                  Resto
                  <Text component="span" c={"teal.8"} fw={600}>
                    Table
                  </Text>
                </Text>
              )}
            </Group>

            {isUserPending ? (
              <Skeleton height={50} />
            ) : (
              <Group
                gap={8}
                className="border-[1.5px] border-[#DEE2E6]"
                bdrs={"sm"}
                py={5}
                px={"xs"}
                hidden={collapsed}
              >
                <Box bg={"gray.1"} c={"gray.5"} p={8} bdrs={"sm"}>
                  <Store size={14} />
                </Box>

                <Stack gap={0}>
                  <Text fw={600} size="xs">
                    {user?.role === "superadmin"
                      ? "Платформа"
                      : user?.restaurant?.name}
                  </Text>
                  <Text size={"xs"} c={"gray.6"}>
                    {/* Total numbers of restaurants comes here or restaurant address*/}
                    4 ресторанов
                  </Text>
                </Stack>
              </Group>
            )}
          </Stack>

          <Stack gap={"xs"}>
            {isUserPending ? (
              <Skeleton height={15} />
            ) : (
              <Text
                c={"gray.5"}
                fw={600}
                size="xs"
                lts={"1px"}
                hidden={collapsed}
              >
                {user?.role === "superadmin"
                  ? "ПЛАТФОРМА"
                  : user?.role === "restaurant_admin"
                    ? "ЗАЛ"
                    : "СКЛАД"}
              </Text>
            )}

            {isUserPending ? (
              <Stack>
                <Skeleton height={35} />
                <Skeleton height={35} />
                <Skeleton height={35} />
                <Skeleton height={35} />
              </Stack>
            ) : (
              <Stack gap={4}>
                {user?.role === "superadmin" ? (
                  SuperAdminLinks.map((link) => (
                    <SidebarLink
                      key={link.id}
                      path={link.path}
                      label={link.label}
                      icon={link.icon}
                      collapsed={collapsed}
                    />
                  ))
                ) : user?.role === "restaurant_admin" ? (
                  <Stack gap={4}>
                    {RestaurantAdminHallLinks.map((link) => (
                      <SidebarLink
                        key={link.id}
                        path={link.path}
                        label={link.label}
                        icon={link.icon}
                        collapsed={collapsed}
                      />
                    ))}

                    {!collapsed && (
                      <Text c={"gray.5"} fw={600} size="xs" lts={"1px"}>
                        УПРАВЛЕНИЕ
                      </Text>
                    )}

                    {RestaurantAdminControlLinks.map((link) => (
                      <SidebarLink
                        key={link.id}
                        path={link.path}
                        label={link.label}
                        icon={link.icon}
                        collapsed={collapsed}
                      />
                    ))}
                  </Stack>
                ) : (
                  StoreKeeperLinks.map((link) => (
                    <SidebarLink
                      key={link.id}
                      path={link.path}
                      label={link.label}
                      icon={link.icon}
                      collapsed={collapsed}
                    />
                  ))
                )}
              </Stack>
            )}
          </Stack>
        </Stack>

        {isUserPending ? (
          <Skeleton height={50} />
        ) : collapsed ? (
          <Stack align="center">
            <Avatar color="teal.8" className="cursor-pointer">
              <Text c={"white"} size="sm" fw={600}>
                {user?.first_name.charAt(0).toUpperCase()}
              </Text>
              <Text c={"white"} size="sm" fw={600}>
                {user?.last_name.charAt(0).toUpperCase()}
              </Text>
            </Avatar>

            <ActionIcon
              variant="transparent"
              color="#868E96"
              onClick={() => logout()}
              loading={isLogoutPending}
            >
              <LogOut size={16} />
            </ActionIcon>
          </Stack>
        ) : (
          <Group
            className={`border-t border-[#E9ECEF] pt-2`}
            justify="space-between"
          >
            <Group
              gap={12}
              className="hover:bg-black/5 flex-1 cursor-pointer py-2 px-1 rounded-lg"
            >
              <Avatar color="teal.8" size={"2.2rem"}>
                <Text c={"white"} size="sm" fw={600}>
                  {user?.first_name.charAt(0).toUpperCase()}
                </Text>
                <Text c={"white"} size="sm" fw={600}>
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

            <ActionIcon
              variant="transparent"
              color="#868E96"
              onClick={() => logout()}
              loading={isLogoutPending}
            >
              <LogOut size={16} />
            </ActionIcon>
          </Group>
        )}
      </Stack>
    </div>
  );
};
