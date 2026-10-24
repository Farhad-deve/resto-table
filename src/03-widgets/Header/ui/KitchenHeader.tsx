import { useMe } from "@/05-entities/user";
import { Button, Drawer, Group, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Ban, User } from "lucide-react";
import { Link } from "react-router";

export const KitchenHeader = () => {
  const { data: user } = useMe();
  const [opened, { open, close }] = useDisclosure();

  return (
    <header className="max-w-[1540px] w-full mx-auto">
      <Group px={"sm"} justify="space-between">
        <Group>
          <Link to="/">
            <Group gap={10}>
              <img src="/favicon.svg" alt="Logo" className="w-8" />
            </Group>
          </Link>

          <Stack gap={0}>
            <Text fw={500}>Кухня</Text>
            <Group gap={5}>
              <Text size="xs" c={"#828282"}>
                {user?.restaurant?.name}
              </Text>

              <span>·</span>
              
              <Text size="xs" c={"#828282"}>
                {user?.first_name} {user?.last_name}
              </Text>
            </Group>
          </Stack>
        </Group>

        <Group>
          <Group className="border-r border-[#828282]" px={"md"}>
            <Stack gap={0} ta={"right"}>
              <Text size="sm">2</Text>
              <Text size="xs">заказов</Text>
            </Stack>

            <Stack gap={0} ta={"right"}>
              <Text size="sm">18</Text>
              <Text size="xs">в работе</Text>
            </Stack>

            <Stack gap={0} ta={"right"}>
              <Text size="sm">0</Text>
              <Text size="xs">просрочено</Text>
            </Stack>
          </Group>

          <Group>
            <Text size="xl">14:17</Text>
            <Button onClick={open} leftSection={<Ban size={18} />}>
              Стоп лист
            </Button>
            <Button leftSection={<User size={18} />}>
              Профиль
            </Button>
          </Group>

          <Drawer position="right" opened={opened} onClose={close}>
            Dishes of ban list
          </Drawer>
        </Group>
      </Group>
    </header>
  );
};
