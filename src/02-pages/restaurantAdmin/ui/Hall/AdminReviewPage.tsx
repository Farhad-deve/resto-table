import { SkeletonLoading } from "@/03-widgets/SkeletonLoading";
import { useRestAdminStats } from "@/05-entities/review";
import { useOrders } from "@/05-entities/orders";
import { useMe, useMyRestaurantId } from "@/05-entities/user";
import { formatPrice, formatToElapsedTime } from "@/06-shared/utils";
import {
  Badge,
  Box,
  Card,
  Grid,
  Group,
  Progress,
  Stack,
  Table,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  Armchair,
  Ban,
  Banknote,
  BellRing,
  CalendarCheck2Icon,
  CalendarClock,
  ChevronRight,
  CircleCheck,
  Package,
  ReceiptText,
  TriangleAlert,
} from "lucide-react";
import { Link, useNavigate } from "react-router";

export const AdminReviewPage = () => {
  const { data: user } = useMe();
  const restId = useMyRestaurantId();
  const { data: restAdminStats, isPending: isRestAdminStatsPending } = useRestAdminStats(restId, true);
  const { data: openOrders, isPending: isOpenOrdersPending } = useOrders(restId, { status: "open", page: 1 });
  const navigate = useNavigate();

  const todaysDate = new Date().toLocaleDateString("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const dayState = new Date().getHours() < 10 ? "утро" : new Date().getHours() >= 18  ? "вечер" : "день";

  const restTables = restAdminStats?.tables;
  const restOrders = restAdminStats?.orders;
  const restReservations = restAdminStats?.reservations;
  const restStock = restAdminStats?.stock;
  const restMenu = restAdminStats?.menu;

  const occupiedTables = restTables?.occupied ?? 0;
  const totalTables = restTables?.total ?? 0;

  const revenueToday = Number(restOrders?.revenue_today ?? 0);
  const revenueCash = Number(restOrders?.revenue_cash ?? 0);
  const revenueCard = Number(restOrders?.revenue_card ?? 0);
  const otherRevenue = Number(revenueToday - (revenueCash + revenueCard));

  const tablePercentage = totalTables > 0 ? (occupiedTables / totalTables) * 100 : 0;
  const percentageCash = revenueToday > 0 ? (revenueCash / revenueToday) * 100 : 0;
  const percentageCard = revenueToday > 0 ? (revenueCard / revenueToday) * 100 : 0;
  const percentageOther = revenueToday > 0 ? (otherRevenue / revenueToday) * 100 : 0;

  const isEverythingOK =
    restReservations?.pending === 0 &&
    restStock?.low_count === 0 &&
    restStock.out_count === 0 &&
    restMenu?.stop_count === 0;

  const isThereOpenOrders = openOrders?.count ?? 0 > 0;

  const openOrdersCount = openOrders?.count ?? 0;
  const first5OpenOrders = openOrders?.results.slice(0, 5).length ?? 0;
  const remainingOpenOrders = openOrdersCount - first5OpenOrders;

  

  return (
    <Stack>
      <Group justify="space-between">
        <Stack gap={0}>
          <Text size="xl" fw={600}>
            Добрый {dayState}, {user?.first_name}
          </Text>
          <Group c={"gray"} gap={5}>
            <Text size="sm">
              {todaysDate.charAt(0).toUpperCase() + todaysDate.slice(1)} ·{" "}
              {user?.restaurant?.name}
            </Text>
          </Group>
        </Stack>
      </Group>

      {isRestAdminStatsPending || isOpenOrdersPending ? <SkeletonLoading /> : (
        <Stack>
          <Grid>
            <Grid.Col span={{ base: 12, xs: 6, md: 3 }}>
              <Card
                withBorder
                h={"100%"}
                onClick={() => navigate("/admin/tables")}
                className="cursor-pointer hover:border-gray-300!"
              >
                <Stack gap="sm" justify="space-between" h="100%">
                  <Group gap={10}>
                    <ThemeIcon size="lg" color="#fff0f0" c="red.9">
                      <Armchair size={18} />
                    </ThemeIcon>

                    <Text c="gray" size="sm" fw={500}>
                      Занято столов
                    </Text>
                  </Group>

                  <Stack gap="sm">
                    <Group gap={5}>
                      <span className="text-2xl font-semibold">
                        {restAdminStats?.tables.occupied}
                      </span>
                      <Text c="gray" size="sm" fw={500}>
                        / {restAdminStats?.tables.total}
                      </Text>
                    </Group>
                    <Progress
                      color="#ff8787"
                      size="sm"
                      value={tablePercentage}
                    />
                  </Stack>
                </Stack>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, xs: 6, md: 3 }}>
              <Card withBorder h={"100%"}>
                <Stack gap="sm" justify="space-between" h="100%">
                  <Group gap={10}>
                    <ThemeIcon size="lg" color="#e6fcf5" c="teal.9">
                      <Banknote size={18} />
                    </ThemeIcon>

                    <Text c="gray" size="sm" fw={500}>
                      Выручка сегодня
                    </Text>
                  </Group>

                  <Stack gap={5}>
                    <Group justify="space-between">
                      <Group gap={5} align="flex-end">
                        <Title>{formatPrice(revenueToday)}</Title>
                        <Text c="gray" size="sm" fw={500}>
                          сум
                        </Text>
                      </Group>

                      {restOrders?.closed_today_count !== 0 && (
                        <Text c="gray" size="xs" fw={500}>
                          {restOrders?.closed_today_count} закрытых
                        </Text>
                      )}
                    </Group>

                    {restOrders?.closed_today_count === 0 ? (
                      <Text c="gray" size="xs" fw={500}>
                        пока нет закрытых заказов
                      </Text>
                    ) : (
                      <Text c="gray" size="xs" fw={500}>
                        наличие {Math.round(percentageCash)}% · карта{" "}
                        {Math.round(percentageCard)}% · другое{" "}
                        {Math.round(percentageOther)}%
                      </Text>
                    )}
                  </Stack>
                </Stack>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, xs: 6, md: 3 }}>
              <Card
                withBorder
                h={"100%"}
                onClick={() => navigate("/admin/orders")}
                className="cursor-pointer hover:border-gray-300!"
              >
                <Stack gap="sm" justify="space-between" h="100%">
                  <Group gap={10}>
                    <ThemeIcon size="lg" color="#e7f5ff" c="#1c7ed6">
                      <ReceiptText size={18} />
                    </ThemeIcon>

                    <Text c="gray" size="sm" fw={500}>
                      Открытые заказы
                    </Text>
                  </Group>

                  <Stack gap={5}>
                    <Title>{restOrders?.open_count}</Title>
                    {restOrders?.open_count === 0 ? (
                      <Text c="gray" size="xs" fw={500}>
                        сейчас нет
                      </Text>
                    ) : (
                      <Text c="gray" size="xs" fw={500}>
                        на сумму {formatPrice(Number(restOrders?.open_total))}
                      </Text>
                    )}
                  </Stack>
                </Stack>
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, xs: 6, md: 3 }}>
              <Card
                withBorder
                h={"100%"}
                onClick={() => navigate("/admin/reservations")}
                className="cursor-pointer hover:border-gray-300!"
              >
                <Stack>
                  <Group gap={10}>
                    <ThemeIcon size="lg" color="#f3f0ff" c="#7048e8">
                      <CalendarCheck2Icon size={18} />
                    </ThemeIcon>

                    <Text c="gray" size="sm" fw={500}>
                      Брони на подтверждение
                    </Text>
                  </Group>

                  <Stack gap={5}>
                    <Title>{restReservations?.pending}</Title>
                    {(restReservations?.pending ?? 0 > 0) ? (
                      <Text c="yellow.9" size="xs" fw={500}>
                        ожидают ответа
                      </Text>
                    ) : (
                      <Text c="gray" size="xs" fw={500}>
                        всего на сегодня: {restReservations?.today}
                      </Text>
                    )}
                  </Stack>
                </Stack>
              </Card>
            </Grid.Col>
          </Grid>

          <Grid>
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Box bg={"white"} bdrs={"md"} mih={295} className="border border-gray-200">
                <Group
                  px={"sm"}
                  py={"sm"}
                  className="border-b! border-gray-200!"
                >
                  <Text fw={500} size="sm">
                    Требует внимание
                  </Text>
                </Group>

                {isEverythingOK ? (
                  <Stack h={295} gap={5} justify="center" align="center">
                    <CircleCheck size={18} color="green" />
                    <Text c="gray" size="sm" ta={"center"}>
                      Всё спокойно
                    </Text>
                  </Stack>
                ) : (
                  <Table.ScrollContainer h={295} minWidth={550}>
                    <Table
                      highlightOnHover
                      verticalSpacing={3}
                      horizontalSpacing={5}
                    >
                      <Table.Tbody>
                        {(restReservations?.pending ?? 0) > 0 && (
                          <Table.Tr
                            className="border-b! border-gray-100! cursor-pointer"
                            onClick={() => navigate("/admin/reservations")}
                          >
                            <Table.Td>
                              <Group justify="space-between" p={"sm"}>
                                <Group>
                                  <ThemeIcon
                                    size="lg"
                                    color="#fff9db"
                                    c="yellow.9"
                                  >
                                    <CalendarClock size={18} />
                                  </ThemeIcon>

                                  <Stack gap={0}>
                                    <Text size="xs" fw={500}>
                                      {restReservations?.pending} бронь ждёт
                                      подтверждения
                                    </Text>
                                    <Text size="xs" c="gray">
                                      Гости увидят новый статус в своём кабинете
                                    </Text>
                                  </Stack>
                                </Group>

                                <ChevronRight color="gray" size={18} />
                              </Group>
                            </Table.Td>
                          </Table.Tr>
                        )}
                        {(restStock?.out_count ?? 0) > 0 && (
                          <Table.Tr
                            className="border-b! border-gray-100! cursor-pointer"
                            onClick={() => navigate("/admin/storage")}
                          >
                            <Table.Td>
                              <Group justify="space-between" p={"sm"}>
                                <Group>
                                  <ThemeIcon
                                    size="lg"
                                    color="#fff0f0"
                                    c="red.9"
                                  >
                                    <Package size={18} />
                                  </ThemeIcon>

                                  <Stack gap={0}>
                                    <Text size="xs" fw={500}>
                                      Закончились ингредиенты:{" "}
                                      {restStock?.out_count}
                                    </Text>
                                    <Text size="xs" c="gray">
                                      {restStock?.out_names.join(", ")}
                                    </Text>
                                  </Stack>
                                </Group>

                                <ChevronRight color="gray" size={18} />
                              </Group>
                            </Table.Td>
                          </Table.Tr>
                        )}
                        {(restStock?.low_count ?? 0) > 0 && (
                          <Table.Tr
                            className="border-b! border-gray-100! cursor-pointer"
                            onClick={() => navigate("/admin/storage")}
                          >
                            <Table.Td>
                              <Group justify="space-between" p={"sm"}>
                                <Group>
                                  <ThemeIcon
                                    size="lg"
                                    color="#fff9db"
                                    c="yellow.9"
                                  >
                                    <TriangleAlert size={18} />
                                  </ThemeIcon>

                                  <Stack gap={0}>
                                    <Text size="xs" fw={500}>
                                      Заканчиваются ингредиенты:{" "}
                                      {restStock?.low_count}
                                    </Text>
                                    <Text size="xs" c="gray">
                                      {restStock?.low_names.join(", ")}
                                    </Text>
                                  </Stack>
                                </Group>

                                <ChevronRight color="gray" size={18} />
                              </Group>
                            </Table.Td>
                          </Table.Tr>
                        )}
                        {(restMenu?.stop_count ?? 0) > 0 && (
                          <Table.Tr
                            className="border-b! border-gray-100! cursor-pointer"
                            onClick={() => navigate("/admin/menu")}
                          >
                            <Table.Td>
                              <Group justify="space-between" p={"sm"}>
                                <Group>
                                  <ThemeIcon size="lg" color="gray.2" c="dark">
                                    <Ban size={18} />
                                  </ThemeIcon>

                                  <Stack gap={0}>
                                    <Text size="xs" fw={500}>
                                      В стоп-листе: {restMenu?.stop_count}
                                    </Text>
                                    <Text size="xs" c="gray">
                                      {restMenu?.stop_names.join(", ")}
                                    </Text>
                                  </Stack>
                                </Group>

                                <ChevronRight color="gray" size={18} />
                              </Group>
                            </Table.Td>
                          </Table.Tr>
                        )}
                      </Table.Tbody>
                    </Table>
                  </Table.ScrollContainer>
                )}
              </Box>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 6 }}>
              <Box bg={"white"} bdrs={"md"} mih={295} className="border border-gray-200 overflow-hidden">
                <Group px={"sm"} py={"sm"} justify="space-between" className="border-b! border-gray-200!">
                  <Text fw={500} size="sm">
                    Открытые столы
                  </Text>
                  <Link to="/admin/tables">
                    <Text c="teal.9" fw={500} size="xs">
                      Все столы
                    </Text>
                  </Link>
                </Group>
                
                {isThereOpenOrders ? (
                  <Table.ScrollContainer mih={295} minWidth={550} p={0} scrollAreaProps={{ scrollbarSize: 1 }}>
                    <Table verticalSpacing={0} horizontalSpacing={0}>
                      <Table.Tbody>
                        {openOrders?.results.slice(0, 5).map((order) => (
                          <Table.Tr key={order.id} className="border-b! border-gray-200!">
                            <Table.Td>
                              <Group justify="space-between" p="sm">
                                <Group>
                                  <ThemeIcon size="lg" color="#fff0f0" c="red.9" fw={600}>
                                    {order.table_number.toString().padStart(2, "0")}
                                  </ThemeIcon>
                                  <Stack gap={0}>
                                    <Text size="xs" fw={500}>
                                      {order.waiter_name}
                                    </Text>
                                    <Text size="xs" c="gray">
                                      {formatToElapsedTime(order.created_at)} · {order.order_items.length} поз.
                                    </Text>
                                  </Stack>
                                </Group>

                                <Group gap={10}>
                                  {order.order_items.filter((o) => o.status === "ready").length > 0 && (
                                    <Badge color="green.1" c="teal.9" size="xs" leftSection={<BellRing size={10} />}>
                                      {order.order_items.filter((o) => o.status === "ready").length}
                                    </Badge>
                                  )}
                                  <Text size="xs" fw={500}>
                                    {formatPrice(Number(order.total_order_price))} сум
                                  </Text>
                                </Group>
                              </Group>
                            </Table.Td>
                          </Table.Tr>
                        ))}
                      </Table.Tbody>
                    </Table>
                  </Table.ScrollContainer>
                ) : (
                  <Stack mih={295} gap={5} justify="center" align="center">
                    <Text c="gray" size="sm" ta={"center"}>
                      Открытых столов нет
                    </Text>
                  </Stack>
                )}
                
                {remainingOpenOrders > 0 && (
                  <Link to="/admin/tables">
                    <Group py="xs" align="center" justify="center" className="hover:bg-gray-50 cursor-pointer">
                      <Text c="teal.9" size="sm" fw={500}>Ещё {remainingOpenOrders} · все столы</Text> 
                    </Group>
                  </Link>
                )}
              </Box>
            </Grid.Col>
          </Grid>
        </Stack>
      )}
    </Stack>
  );
};
