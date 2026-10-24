import { useRestaurants, useSuperAStats } from "@/05-entities/restaurant";
import { DetailDrawer } from "@/06-shared/ui/DetailDrawer";
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Pagination,
  ScrollArea,
  Stack,
  Table,
  Tabs,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  CircleCheck,
  Edit2,
  Pause,
  Play,
  Plus,
  Search,
  Store,
  Trash,
  UserRoundX,
  X,
} from "lucide-react";
import { useState } from "react";

const isActiveByTab = {
  all: undefined,
  active: true,
  inactive: false,
};

type RestaurantTabs = "all" | "active" | "inactive";

export const SuperAdminRestaurantsPage = () => {
  const [activeTab, setActiveTab] = useState<RestaurantTabs>("all");
  const { data: restaurants } = useRestaurants({
    is_active: isActiveByTab[activeTab],
  });
  const { data: stats } = useSuperAStats();
  const [opened, { open, close }] = useDisclosure();
  const [restaurantInfo, setRestaurantInfo] = useState(null);

  const rows = restaurants?.results.map((rest) => (
    <Table.Tr
      key={rest.id}
      className="cursor-pointer"
      onClick={() => {
        open()
        setRestaurantInfo()
      }}
    >
      <Table.Td>
        <Group gap={10}>
          <ThemeIcon color="gray.1" c={"gray.5"} size={"lg"}>
            <Store size={18} />
          </ThemeIcon>

          <Stack gap={0}>
            <Text size="sm" fw={600}>
              {rest.name}
            </Text>
            <Text size="xs" c={"gray"}>
              {rest.address}
            </Text>
          </Stack>
        </Group>
      </Table.Td>

      <Table.Td>
        {rest.admin === null ? (
          <Text c="red.8" size="sm">
            Не назначен
          </Text>
        ) : (
          <Stack gap={0}>
            <Text size="sm">
              {rest.admin.first_name} {rest.admin.last_name}
            </Text>
            <Text size="xs" c={"gray"}>
              {rest.admin.phone_number}
            </Text>
          </Stack>
        )}
      </Table.Td>

      <Table.Td>
        <Text size="xs" c={"gray.7"}>
          {rest.start_time.slice(0, 5)}-{rest.end_time.slice(0, 5)}
        </Text>
      </Table.Td>

      <Table.Td>
        {rest.is_active ? (
          <Badge
            color="gray.3"
            c={"dark"}
            variant="outline"
            leftSection={
              <div className="w-1.5 h-1.5 bg-[#40c057] rounded-full"></div>
            }
          >
            <Text fw={500} tt={"capitalize"} size="xs">
              Активен
            </Text>
          </Badge>
        ) : (
          <Badge
            color="gray.3"
            c={"gray"}
            variant="outline"
            leftSection={
              <div className="w-1.5 h-1.5 bg-[#adb5bd] rounded-full"></div>
            }
          >
            <Text fw={500} tt={"initial"} size="xs">
              Неактивен
            </Text>
          </Badge>
        )}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap={"lg"} p={"xs"}>
      <Group align="flex-end" justify="space-between">
        <Stack gap={0}>
          <Text size="xl" fw={600}>
            Рестораны
          </Text>
          <Text c={"gray"} size="sm">
            Все рестораны платформы · данные каждого изолированы
          </Text>
        </Stack>

        <Button leftSection={<Plus size={18} />}>Новый ресторан</Button>
      </Group>

      <Stack>
        <Grid>
          <Grid.Col span={{ base: 12, xs: 6, sm: 4 }}>
            <Card withBorder>
              <Stack gap={8}>
                <Group gap={10}>
                  <Store size={16} />
                  <Text size="sm" c={"gray"} fw={500}>
                    Всего ресторанов
                  </Text>
                </Group>
                <Title fw={600}>{stats?.total}</Title>
              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, xs: 6, sm: 4 }}>
            <Card withBorder>
              <Stack gap={8}>
                <Group gap={10}>
                  <CircleCheck size={16} color="teal" />
                  <Text size="sm" c={"gray"} fw={500}>
                    Активные
                  </Text>
                </Group>
                <Title c={"teal"} fw={600}>
                  {stats?.active}
                </Title>
              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, xs: 6, sm: 4 }}>
            <Card withBorder>
              <Stack gap={8}>
                <Group gap={10}>
                  <Pause size={16} />
                  <Text size="sm" c={"gray"} fw={500}>
                    Неактивные
                  </Text>
                </Group>
                <Title c={"gray"} fw={600}>
                  {stats?.inactive}
                </Title>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Stack>

      <Stack>
        <Group justify="space-between">
          <TextInput
            placeholder="Название или адрес"
            w={300}
            leftSection={<Search size={16} />}
          />

          <Tabs
            color="white"
            bg={"gray.1"}
            p={4}
            bdrs={"sm"}
            variant="pills"
            value={activeTab}
            onChange={(tab) => {
              if (tab) {
                setActiveTab(tab as RestaurantTabs);
              }
            }}
          >
            <Tabs.List>
              <Tabs.Tab value="all" fw={500} c={"dark"} px={"xs"}>
                Все
              </Tabs.Tab>

              <Tabs.Tab value="active" fw={500} c={"dark"} px={"xs"}>
                Активные
              </Tabs.Tab>

              <Tabs.Tab value="inactive" fw={500} c={"dark"} px={"xs"}>
                Неактивные
              </Tabs.Tab>
            </Tabs.List>
          </Tabs>
        </Group>

        <Grid>
          <Grid.Col span={{ base: 12, lg: 8.5 }}>
            <ScrollArea
              scrollbarSize={5}
              offsetScrollbars
              bdrs={"md"}
              bg={"white"}
              className="overflow-hidden border border-[#e9ecef]"
            >
              <Table
                miw={650}
                highlightOnHover
                bg={"white"}
                verticalSpacing={"sm"}
                horizontalSpacing={"lg"}
                className="rounded-lg"
              >
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>
                      <Text size="xs" fw={600} c={"gray.7"}>
                        Ресторан
                      </Text>
                    </Table.Th>
                    <Table.Th>
                      <Text size="xs" fw={600} c={"gray.7"}>
                        Адиминиcтратор
                      </Text>
                    </Table.Th>
                    <Table.Th>
                      <Text size="xs" fw={600} c={"gray.7"}>
                        Часы
                      </Text>
                    </Table.Th>
                    <Table.Th>
                      <Text size="xs" fw={600} c={"gray.7"}>
                        Статус
                      </Text>
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>

                <Table.Tbody>{rows}</Table.Tbody>
              </Table>

              <Group
                justify="space-between"
                p={"md"}
                className="border-t border-gray-200"
              >
                <Text size="xs" c={"gray"}>
                  <span></span>-<span>{restaurants?.results?.length}</span> из{" "}
                  {restaurants?.count}
                </Text>

                {/* <Pagination withPages={false} /> */}
              </Group>
            </ScrollArea>
          </Grid.Col>

          <Grid.Col span={{ base: 12, lg: 3.5 }}>
            <DetailDrawer
              emptyStateText="Выберите ресторан, чтобы увидеть детали и администратора"
              EmptyStateIcon={Store}
              isDrawerOpen={opened}
              drawerTitle="Ресторан"
              onDrawerOpen={open}
              onDrawerClose={close}
              content={
                <Stack gap={0}>
                  <Stack
                    px={"md"}
                    py={"sm"}
                    gap={10}
                    style={{ borderBottom: "1px solid #efefef" }}
                  >
                    <Group justify="space-between">
                      <ThemeIcon
                        size={"xl"}
                        bg={"gray.1"}
                        variant="transparent"
                        c={"gray.5"}
                      >
                        <Store size={20} />
                      </ThemeIcon>

                      <ActionIcon
                        variant="transparent"
                        c={"gray"}
                        size={"lg"}
                        className="hover:bg-gray-100!"
                        onClick={close}
                      >
                        <X size={16} />
                      </ActionIcon>
                    </Group>

                    <Stack gap={0}>
                      <Group gap={10}>
                        <Text size="lg" c={"dark"} fw={600}>
                          {/* Restaurant names comes here */}
                          Asosiy restoran
                        </Text>

                        {/* Активен if active */}
                        <Badge
                          color="gray.3"
                          size="lg"
                          c={"dark"}
                          variant="outline"
                          leftSection={
                            <div className="w-1.5 h-1.5 bg-[#40c057] rounded-full"></div>
                          }
                        >
                          <Text fw={500} tt={"capitalize"} size="xs">
                            Активен
                          </Text>
                        </Badge>

                        {/* Неактивен if inactive */}
                        {/* <Badge
                          color="gray.3"
                          size="lg"
                          c={"dark"}
                          variant="outline"
                          leftSection={
                            <div className="w-1.5 h-1.5 bg-[#adb5bd] rounded-full"></div>
                          }
                        >
                          <Text fw={500} tt={"capitalize"} size="xs">
                            Неактивен
                          </Text>
                        </Badge> */}
                      </Group>

                      <Text size="xs" c={"gray"}>
                        {/* Restaurant adress comes here */}
                        Nukus shahri
                      </Text>
                    </Stack>
                  </Stack>

                  <Group
                    px={"md"}
                    py={"sm"}
                    style={{ borderBottom: "1px solid #efefef" }}
                  >
                    <Stack gap={0}>
                      <Text size="xs" c={"gray"}>
                        Телефон
                      </Text>
                      <Text size="sm" fw={500} c={"dark"}>
                        {/* Restaurant phone comes here */}
                        +998 99 999 99 99
                      </Text>
                    </Stack>

                    <Stack gap={0}>
                      <Text size="xs" c={"gray"}>
                        Час работы
                      </Text>
                      <Text size="sm" fw={500} c={"dark"}>
                        {/* Restaurant working hours comes here */}
                        10:00 - 22:00
                      </Text>
                    </Stack>
                  </Group>

                  {/* Yes admin UI vv */}
                  <Group
                    px={"md"}
                    py={"sm"}
                    gap={12}
                    style={{ borderBottom: "1px solid #efefef" }}
                  >
                    <Avatar variant="light" color="teal.1">
                      {/* Admin avatar initials comes here */}
                      <Text fw={600} size="sm">
                        AA
                      </Text>
                    </Avatar>

                    <Stack gap={0}>
                      <Text size="xs" fw={600} c={"dark"}>
                        {/* Admin name comes here */}
                        Admin Name
                      </Text>
                      <Text size="xs" c={"gray"}>
                        {/* Admin phone comes here */}
                        +998 90 100 00 01
                      </Text>
                    </Stack>
                  </Group>

                  {/* No admin UI vv */}
                  {/* <Group px={"md"} py={"sm"} gap={12}>
                    <Avatar
                      variant="transparent"
                      color="red"
                      style={{
                        borderWidth: "1px",
                        borderStyle: "dashed",
                        borderColor: "red.8",
                      }}
                    >
                      <UserRoundX size={13} />
                    </Avatar>

                    <Stack gap={0}>
                      <Text size="xs" fw={600} c={"red.8"}>
                        Админ не назначен
                      </Text>
                      <Text size="xs" c={"gray"}>
                        Назначьте его в разделе «Администраторы»
                      </Text>
                    </Stack>
                  </Group> */}
                </Stack>
              }
              actions={
                <Stack px={"md"} py={"sm"} gap={"xs"}>
                  <Button
                    leftSection={<Edit2 size={14} />}
                    color="gray.3"
                    variant="outline"
                    c={"gray.7"}
                  >
                    <Text size="xs" fw={600}>
                      Редактировать
                    </Text>
                  </Button>

                  {/* <Stack gap={5}>
                    <Button
                      leftSection={<Play size={14} />}
                      color="teal"
                      variant="outline"
                      c={"teal"}
                    >
                      <Text size="xs" fw={600}>
                        Активировать
                      </Text>
                    </Button>
                    <Text size={"xs"} c={"gray"}>
                      Неактивный ресторан не доступен для бронирования
                    </Text>
                  </Stack> */}

                  <Button
                    leftSection={<Pause size={14} />}
                    color="red.8"
                    variant="outline"
                    c={"red.8"}
                  >
                    <Text size="xs" fw={600}>
                      Деактивировать
                    </Text>
                  </Button>

                  <Button
                    leftSection={<Trash size={14} />}
                    color="red.8"
                    variant="outline"
                    c={"red.8"}
                  >
                    <Text size="xs" fw={600}>
                      Удалить ресторан
                    </Text>
                  </Button>
                </Stack>
              }
            />
          </Grid.Col>
        </Grid>
      </Stack>
    </Stack>
  );
};
