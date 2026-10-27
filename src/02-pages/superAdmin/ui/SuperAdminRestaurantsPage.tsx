import { useDeleteRestaurant, useRestaurants, useSuperAStats, type Restaurant } from "@/05-entities/restaurant";
import { formatPhoneNumber } from "@/06-shared/lib/utils";
import { ConfirmModal } from "@/06-shared/ui/ConfirmModal";
import { DetailDrawer } from "@/06-shared/ui/DetailDrawer";
import { InfoTable } from "@/06-shared/ui/InfoTable";
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Stack,
  Table,
  Tabs,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useDebouncedValue, useDisclosure, useMediaQuery } from "@mantine/hooks";
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
import { useEffect, useState } from "react";
import { TableHeaderData } from "../config/TableData";

const isActiveByTab = {
  all: undefined,
  active: true,
  inactive: false,
};

type RestaurantTabs = "all" | "active" | "inactive";

export const SuperAdminRestaurantsPage = () => {
  const [activeTab, setActiveTab] = useState<RestaurantTabs>("all");
  const [selectedRestaurant, setselectedRestaurant] = useState<Restaurant>();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 500);
  
  const { data: restaurants } = useRestaurants({ is_active: isActiveByTab[activeTab], page: page, search: debouncedSearch });
  const { data: stats } = useSuperAStats();
  const { mutate: deleteRestaurant, isPending: isDeletePending } = useDeleteRestaurant();

  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure();
  const [confirmModalOpened, { open: openConfirmModal, close: closeConfirmModal }] = useDisclosure();

  const isLgScreen = useMediaQuery("(min-width: 1200px)");

  const bodyRows = restaurants?.results.map((rest) => (
    <Table.Tr key={rest.id}
      className={`cursor-pointer border-b! border-[#f1f3f5]! ${!rest.is_active ? "opacity-45" : ""} ${selectedRestaurant?.id === rest.id ? "bg-teal-50!" : ""}`}
      onClick={() => {
        openDrawer();
        setselectedRestaurant(rest)
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
              {formatPhoneNumber(rest.admin.phone_number)}
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

  const itemsPerPage = 10;
  const TotalPages = Math.ceil((restaurants?.count ?? 0) / itemsPerPage);
  const fromItemsIndex = restaurants?.results && restaurants.results.length > 0
    ? (page - 1) * itemsPerPage + 1
    : 0;

  const toItemsIndex = fromItemsIndex > 0
    ? fromItemsIndex + (restaurants?.results.length ?? 0) - 1
    : 0;

    useEffect(() => {
      setPage(1);
      closeDrawer();
      setselectedRestaurant(undefined);
    }, [activeTab, search]);

    useEffect(() => {
      closeDrawer();
      setselectedRestaurant(undefined);
      setSearch("");
    }, [page])

  return (
    <Stack gap={"lg"}>
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
            <Card withBorder h={"100%"}>
              <Stack gap={8}>
                <Group gap={10}>
                  <Store size={16} />
                  <Text size="xs" c={"gray"} fw={500}>
                    Всего ресторанов
                  </Text>
                </Group>
                <Title fw={600}>{stats?.total}</Title>
              </Stack>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, xs: 6, sm: 4 }}>
            <Card withBorder h={"100%"}>
              <Stack gap={8}>
                <Group gap={10}>
                  <CircleCheck size={16} color="teal" />
                  <Text size="xs" c={"gray"} fw={500}>
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
            <Card withBorder h={"100%"}>
              <Stack gap={8}>
                <Group gap={10}>
                  <Pause size={16} />
                  <Text size="xs" c={"gray"} fw={500}>
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
            <InfoTable
              headerRowsArray={TableHeaderData}
              bodyRows={bodyRows}
              fromItems={fromItemsIndex}
              toItems={toItemsIndex}
              totalItems={restaurants?.count ?? 0}
              currentPage={page}
              totalPages={TotalPages}
              onPageChange={setPage}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, lg: 3.5 }}>
            <DetailDrawer emptyStateText="Выберите ресторан, чтобы увидеть детали и администратора"
              EmptyStateIcon={Store}
              isDrawerOpen={drawerOpened}
              drawerTitle="Ресторан"
              onDrawerOpen={openDrawer}
              onDrawerClose={closeDrawer}
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

                      {isLgScreen && (
                        <ActionIcon
                          variant="transparent"
                          c={"gray"}
                          size={"lg"}
                          className="hover:bg-gray-100!"
                          onClick={closeDrawer}
                        >
                          <X size={16} />
                        </ActionIcon>
                      )}
                    </Group>

                    <Stack gap={0}>
                      <Group gap={10}>
                        <Text size="lg" c={"dark"} fw={600}>
                          {selectedRestaurant?.name}
                        </Text>

                        {selectedRestaurant?.is_active ? (
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
                        ) : (
                          <Badge
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
                          </Badge>
                        )}
                      </Group>

                      <Text size="xs" c={"gray"}>
                        {selectedRestaurant?.address}
                      </Text>
                    </Stack>
                  </Stack>

                  <Group
                    px={"md"}
                    py={"sm"}
                    style={{ borderBottom: "1px solid #efefef" }}
                    gap={"lg"}
                  >
                    <Stack gap={0}>
                      <Text size="xs" c={"gray"}>
                        Телефон
                      </Text>
                      <Text size="xs" fw={500} c={"dark"}>
                        {formatPhoneNumber(selectedRestaurant?.phone ?? "")}
                      </Text>
                    </Stack>

                    <Stack gap={0}>
                      <Text size="xs" c={"gray"}>
                        Час работы
                      </Text>
                      <Text size="xs" fw={500} c={"dark"}>
                        {selectedRestaurant?.start_time.slice(0, 5)} - {selectedRestaurant?.end_time.slice(0, 5)}
                      </Text>
                    </Stack>
                  </Group>

                  {selectedRestaurant?.admin ? (
                    <Group
                      px={"md"}
                      py={"sm"}
                      gap={12}
                      style={{ borderBottom: "1px solid #efefef" }}
                    >
                      <Avatar variant="light" color="teal.1">
                        <Text fw={600} size="sm">
                          {selectedRestaurant?.admin?.first_name.charAt(0).toUpperCase()}
                          {selectedRestaurant?.admin?.last_name.charAt(0).toUpperCase()}
                        </Text>
                      </Avatar>

                      <Stack gap={0}>
                        <Text size="xs" fw={600} c={"dark"}>
                          {selectedRestaurant?.admin?.first_name}{" "}
                          {selectedRestaurant?.admin?.last_name}
                        </Text>
                        <Text size="xs" c={"gray"}>
                          {formatPhoneNumber(selectedRestaurant?.admin.phone_number)}
                        </Text>
                      </Stack>
                    </Group>
                  ) : (               
                    <Group px={"md"} py={"sm"} gap={12}>
                      <Avatar
                        variant="transparent"
                        color="red"
                        style={{
                          borderWidth: "1px",
                          borderStyle: "dashed",
                          borderColor: "#ffa8a8",
                        }}
                      >
                        <UserRoundX size={15} />
                      </Avatar>

                      <Stack gap={0}>
                        <Text size="xs" fw={600} c={"red.8"}>
                          Админ не назначен
                        </Text>
                        <Text size="xs" c={"gray"}>
                          Назначьте его в разделе «Администраторы»
                        </Text>
                      </Stack>
                    </Group>
                  )}
                </Stack>
              }
              actions={
                <Stack px={"md"} py={"sm"} gap={"xs"}>
                  <Button
                    leftSection={<Edit2 size={14} />}
                    variant="outline"
                    c={"gray.7"}
                    color="gray"
                  >
                    <Text size="xs" fw={600}>
                      Редактировать
                    </Text>
                  </Button>

                  {selectedRestaurant?.is_active ? (
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
                  ) : (
                    <Stack gap={5}>
                      <Button
                        leftSection={<Play size={14} />}
                        variant="outline"
                        c={"teal"}
                      >
                        <Text size="xs" fw={600}>
                          Активировать
                        </Text>
                      </Button>
                      <Text ta={"center"} size={"xs"} c={"gray"}>
                        Неактивный ресторан не доступен для бронирования
                      </Text>
                    </Stack>
                  )}

                  <Button
                    leftSection={<Trash size={14} />}
                    color="red.8"
                    variant="outline"
                    c={"red.8"}
                    onClick={openConfirmModal}
                  >
                    <Text size="xs" fw={600}>
                      Удалить ресторан
                    </Text>
                  </Button>

                  <ConfirmModal title={`Удалить «${selectedRestaurant?.name}»?`}
                    description="
                    Меню, столы, склад, сотрудники, заказы, брони и администратор ресторана
                    будут удалены без возможности восстановления. Чтобы временно скрыть
                    ресторан, используйте «Деактивировать»
                    "
                    confirmButtonLabel="Удалить навсегда"
                    opened={confirmModalOpened}
                    closeModal={closeConfirmModal}
                    onConfirm={() => {
                      deleteRestaurant(selectedRestaurant?.id!, {
                        onSuccess: () => {
                          closeConfirmModal();
                          closeDrawer();
                        }
                      })
                    }}
                    isConfirmLoading={isDeletePending}
                  />
                </Stack>
              }
            />
          </Grid.Col>
        </Grid>
      </Stack>
    </Stack>
  );
};
