import {
  Avatar,
  Badge,
  Box,
  Group,
  Indicator,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { Globe, ShelvingUnit, Store } from "lucide-react";
import {
  RestaurantAdminLinks,
  StoreKeeperLinks,
  SuperAdminLinks,
} from "../config/LinksData";
import { SidebarLink } from "./SidebarLink";
import { LogoutButton } from "@/04-features/auth";
import { useMe } from "@/05-entities/user";
import { ProfileButton } from "@/06-shared/ui/ProfileButton";
import { useSuperAStats } from "@/05-entities/restaurant";
import { useDisclosure } from "@mantine/hooks";
import { CancelButton, ChangeModal } from "@/06-shared/ui";
import { ChangePasswordForm, ChangeUserDetailForm } from "@/04-features/user";

interface SidebarProps {
  collapsed: boolean;
}

export const Sidebar = ({ collapsed }: SidebarProps) => {
  const { data: user } = useMe();
  const { data: stats } = useSuperAStats();
  const [
    changeModalOpened,
    { open: openChangeModal, close: closeChangeModal },
  ] = useDisclosure();

  const RestaurantAdminHallLinks = RestaurantAdminLinks.filter(
    (link) => link.category === "Зал",
  );
  const RestaurantAdminControlLinks = RestaurantAdminLinks.filter(
    (link) => link.category === "Управление",
  );

  const showBadge = ({
    badgeIndicatorColor,
    badgeContent,
  }: {
    badgeIndicatorColor: string;
    badgeContent: string;
  }) => {
    if (!stats?.inactive || stats.inactive <= 0) return null;

    if (collapsed) {
      return (
        <Indicator
          color={badgeIndicatorColor}
          size={6}
          processing
          style={{ position: "absolute", top: "0.5rem", right: "1.3rem" }}
        >
          <span></span>
        </Indicator>
      );
    }

    return (
      <Badge color={badgeIndicatorColor} size="xs">
        <Text c={"dark"} fw={500} size="xs" tt={"lowercase"}>
          {badgeContent}
        </Text>
      </Badge>
    );
  };

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

            <Group
              gap={8}
              className="border-[1.5px] border-[#DEE2E6]"
              bdrs={"sm"}
              py={5}
              px={"xs"}
              hidden={collapsed}
            >
              <Box bg={"gray.1"} c={"gray.5"} p={8} bdrs={"sm"}>
                {user?.role === "superadmin" ? (
                  <Globe size={14} />
                ) : user?.role === "restaurant_admin" ? (
                  <Store size={14} />
                ) : (
                  <ShelvingUnit size={14} />
                )}
              </Box>

              <Stack gap={0}>
                <Text fw={600} size="sm">
                  {user?.role === "superadmin"
                    ? "Платформа"
                    : user?.restaurant?.name}
                </Text>
                <Text size={"xs"} c={"gray.6"}>
                  {user?.role === "superadmin"
                    ? `${stats?.total} ресторанов`
                    : user?.role === "restaurant_admin"
                      ? "Администратор"
                      : "Склад"}
                </Text>
              </Stack>
            </Group>
          </Stack>

          <Stack gap={"xs"}>
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

            <Stack gap={4}>
              {user?.role === "superadmin" ? (
                SuperAdminLinks.map((link) => (
                  <SidebarLink
                    key={link.id}
                    path={link.path}
                    label={link.label}
                    icon={link.icon}
                    collapsed={collapsed}
                    badge={
                      link.id === 1 &&
                      showBadge({
                        badgeIndicatorColor: "#eee",
                        badgeContent: `неакт. ${stats?.inactive}`,
                      })
                    }
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
          </Stack>
        </Stack>

        {collapsed ? (
          <Stack align="center">
            <Avatar
              onClick={openChangeModal}
              color="teal.8"
              className="cursor-pointer"
            >
              <Text c={"white"} size="sm" fw={600}>
                {user?.first_name.charAt(0).toUpperCase()}
                {user?.last_name.charAt(0).toUpperCase()}
              </Text>
            </Avatar>

            <LogoutButton />
          </Stack>
        ) : (
          <Group className="border-t border-[#E9ECEF] rounded-lg">
            <Box onClick={openChangeModal}>
              <ProfileButton user={user} />
            </Box>

            <LogoutButton />
          </Group>
        )}

        <ChangeModal
          title="Профиль"
          opened={changeModalOpened}
          closeModal={closeChangeModal}
          content={
            <ScrollArea>
              {user && (
                <ChangeUserDetailForm
                  onSave={closeChangeModal}
                  defaultData={user}
                />
              )}

              <ChangePasswordForm onSave={closeChangeModal} />

              <Group
                bg={"#f8f9fa"}
                gap={12}
                py={16}
                px={24}
                className="border-t border-[#e9ecef]"
              >
                <Group justify="space-between" w={"100%"}>
                  <LogoutButton logoutWithText />
                  <CancelButton
                    children="Закрыть"
                    onCancel={closeChangeModal}
                  />
                </Group>
              </Group>
            </ScrollArea>
          }
        />
      </Stack>
    </div>
  );
};
