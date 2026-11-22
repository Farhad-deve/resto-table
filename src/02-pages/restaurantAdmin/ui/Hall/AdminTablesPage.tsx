import {
  Group,
  ColorSwatch,
  Stack,
  Text,
  Tabs,
  Grid,
  Center,
  ActionIcon,
  Box,
  Badge,
  Pagination,
  ScrollArea,
} from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Armchair, Check, CheckCheck, Clock, X } from "lucide-react";
import { SkeletonLoading } from "@/03-widgets/SkeletonLoading";
import {
  CreateTableButton,
  DeleteTableButton,
  UpdateTableButton,
} from "@/04-features/tables";
import {
  getTableDisplayState,
  TableCard,
  useTables,
} from "@/05-entities/tables";
import { useRestAdminStats } from "@/05-entities/review";
import { useMyRestaurantId } from "@/05-entities/user";
import { useOrders, type OrderItem } from "@/05-entities/orders";
import {
  getNextReservationByTable,
  useReservations,
} from "@/05-entities/reservations";
import { DetailDrawer } from "@/06-shared/ui";
import {
  calculatePageItems,
  formatPrice,
  formatToElapsedTime,
  getGivenTime,
  getTodayDate,
} from "@/06-shared/utils";

const isActiveByTab = {
  all: undefined,
  free: "free",
  occupied: "occupied",
  reserved: "reserved",
};

type TablesTabs = "free" | "occupied" | "reserved" | "all";

export const AdminTablesPage = () => {
  const [activeTab, setActiveTab] = useState<TablesTabs>("all");
  const [page, setPage] = useState(1);
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);
  const restId = useMyRestaurantId();
  const { data: restAdminStats, isPending: isRestAdminStatsPending } = useRestAdminStats(restId, true);
  const { data: tables, isPending: isTablesPending } = useTables(restId, {
    page: page,
    page_size: 12,
    status: isActiveByTab[activeTab],
  });
  const { data: onlyReservedTables, isPending: isOnlyReservedPending } = useTables(restId, { status: "reserved" });
  const { data: reservations, isPending: isReservationsPending } = useReservations({ date: getTodayDate() });

  const { data: openOrders, isPending: isOpenOrdersPending } = useOrders(
    restId,
    { status: "open" },
  );

  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure();
  const isLgScreen = useMediaQuery("(min-width: 1200px)");

  const statsTables = restAdminStats?.tables;
  const statsReservations = restAdminStats?.reservations;
  const tablesResults = tables?.results;

  const isAllRequestPending =
    isRestAdminStatsPending ||
    isTablesPending ||
    isOpenOrdersPending ||
    isReservationsPending ||
    isOnlyReservedPending;

  const openOrder: Record<
    number,
    | {
        waiterName: string;
        elapsedTime: string;
        totalOrderPrice: string;
        openUntil: string;
        orderItems: OrderItem[];
      }
    | undefined
  > = Object.fromEntries(
    openOrders?.results.map((order) => [
      order.table,
      {
        waiterName: order.waiter_name,
        elapsedTime: formatToElapsedTime(order.created_at),
        totalOrderPrice: formatPrice(Number(order.total_order_price)),
        openUntil: getGivenTime(order.created_at),
        orderItems: order.order_items,
      },
    ]) ?? [],
  );
  const openOrderInSelectedTable = openOrder[selectedTableId ?? 0];

  const reservedTableIds = new Set(
    onlyReservedTables?.results.map((table) => table.id),
  );
  const nextReservationByTable = getNextReservationByTable(
    reservations?.results ?? [],
  );

  const selectedTable = tables?.results.find(
    (table) => table.id === selectedTableId,
  );

  const selectedTableState =
    selectedTable &&
    getTableDisplayState(
      selectedTable.status,
      reservedTableIds.has(selectedTable.id),
    );
  const selectedTableReservation =
    selectedTable && nextReservationByTable[selectedTable.id];

  useEffect(() => {
    setPage(1);
    closeDrawer();
    setSelectedTableId(null);
  }, [activeTab]);
  useEffect(() => {
    closeDrawer();
    setSelectedTableId(null);
  }, [page]);

  const { TotalPages, fromItemsIndex, toItemsIndex } = calculatePageItems(
    page,
    tables?.count ?? 0,
    tables?.results.length ?? 0,
    12,
  );

  return (
    <>
      {isAllRequestPending ? (
        <SkeletonLoading />
      ) : (
        <Stack gap={"lg"}>
          <Group justify="space-between" align="flex-end">
            <Stack gap={0}>
              <Text size="xl" fw={600}>
                Столы
              </Text>
              <Text size="sm" c="gray">
                {statsTables?.total} столов · свободно {statsTables?.free} ·
                броней сегодня {statsReservations?.today}
              </Text>
            </Stack>

            <CreateTableButton />
          </Group>

          <Group justify="space-between">
            <Group>
              <Group gap={8}>
                <ColorSwatch withShadow={false} size={8} color="#12b886" />
                <Text size="xs">Свободен</Text>
              </Group>

              <Group gap={8}>
                <ColorSwatch withShadow={false} size={8} color="#fa5252" />
                <Text size="xs">Занят</Text>
              </Group>

              <Group gap={8}>
                <ColorSwatch withShadow={false} size={8} color="#7950f2" />
                <Text size="xs">Бронь</Text>
              </Group>
            </Group>

            <Tabs
              color="white"
              bg={"gray.1"}
              p={4}
              bdrs={"sm"}
              variant="pills"
              value={activeTab}
              onChange={(tab) => {
                if (tab) {
                  setActiveTab(tab as TablesTabs);
                  setPage(1);
                }
              }}
            >
              <Tabs.List>
                <Tabs.Tab value="all" fw={500} c={"dark"} px={"xs"}>
                  Все
                </Tabs.Tab>

                <Tabs.Tab value="free" fw={500} c={"dark"} px={"xs"}>
                  Свободные
                </Tabs.Tab>

                <Tabs.Tab value="occupied" fw={500} c={"dark"} px={"xs"}>
                  Занятые
                </Tabs.Tab>

                <Tabs.Tab value="reserved" fw={500} c={"dark"} px={"xs"}>
                  Брони
                </Tabs.Tab>
              </Tabs.List>
            </Tabs>
          </Group>

          <Grid>
            <Grid.Col span={{ base: 12, lg: 8.5 }}>
              {tablesResults?.length === 0 ? (
                <Center
                  h={260}
                  style={{ border: "1px dashed gray ", borderRadius: "20px" }}
                >
                  <Text c="gray">Столов нет</Text>
                </Center>
              ) : (
                <Stack
                  justify="space-between"
                  className="flex-col-reverse! lg:flex-col!"
                >
                  <Grid gap={10} className="lg:h-102.5">
                    {tablesResults?.map((table) => {
                      const order = openOrder[table.id];
                      const isReservedTable = reservedTableIds.has(table.id);
                      const nextReservation = nextReservationByTable[table.id];
                      return (
                        <Grid.Col
                          span={{ base: 12, xs: 6, sm: 4, md: 3 }}
                          key={table.id}
                        >
                          <Box
                            onClick={() => {
                              (setSelectedTableId(table.id), openDrawer());
                            }}
                          >
                            <TableCard
                              table={table}
                              totalPrice={order?.totalOrderPrice}
                              waiterName={order?.waiterName}
                              elapsedTime={order?.elapsedTime}
                              readyDishesNumber={
                                order?.orderItems.filter(
                                  (item) => item.status === "ready",
                                ).length
                              }
                              isReserved={isReservedTable}
                              guestsCount={nextReservation?.guests_count ?? 0}
                              clientName={`${nextReservation?.client.first_name} ${nextReservation?.client.last_name}`}
                              reservationTime={`${nextReservation?.reservation_time.slice(0, 5)}`}
                            />
                          </Box>
                        </Grid.Col>
                      );
                    })}
                  </Grid>

                  <Group
                    justify="space-between"
                    p={"md"}
                    className="border border-gray-200 bg-white rounded-lg"
                  >
                    <Text size="xs" c={"gray"}>
                      <span>{fromItemsIndex}</span>-<span>{toItemsIndex}</span>{" "}
                      из {tables?.count}
                    </Text>

                    <Pagination.Root
                      total={TotalPages}
                      value={page}
                      onChange={(page) => {
                        setPage(page);
                        setSelectedTableId(null);
                        closeDrawer();
                      }}
                    >
                      <Group>
                        <Pagination.Previous />
                        <Text size="xs">
                          {page} / {TotalPages}
                        </Text>
                        <Pagination.Next />
                      </Group>
                    </Pagination.Root>
                  </Group>
                </Stack>
              )}
            </Grid.Col>

            <Grid.Col span={{ base: 12, lg: 3.5 }}>
              <DetailDrawer
                EmptyStateIcon={Armchair}
                emptyStateText="Выберите стол, чтобы увидеть заказ и детали"
                content={
                  <Stack p={0}>
                    <Group
                      p="md"
                      justify="space-between"
                      className="border-b border-gray-200"
                    >
                      <Group>
                        <Text size="xl" fw={600}>
                          Стол {selectedTable?.number}
                        </Text>
                        {selectedTableState === "reserved" ? (
                          <Badge
                            color="gray.3"
                            c="dark"
                            size="lg"
                            variant="outline"
                            leftSection={
                              <div className="w-1.5 h-1.5 bg-[#7950f2] rounded-full"></div>
                            }
                          >
                            <Text fw={500} size="xs" tt="capitalize">
                              Бронь
                            </Text>
                          </Badge>
                        ) : selectedTableState === "occupied" ? (
                          <Badge
                            color="gray.3"
                            c="dark"
                            size="lg"
                            variant="outline"
                            leftSection={
                              <div className="w-1.5 h-1.5 bg-[#fa5252] rounded-full"></div>
                            }
                          >
                            <Text fw={500} size="xs" tt="capitalize">
                              Занят
                            </Text>
                          </Badge>
                        ) : (
                          <Badge
                            color="gray.3"
                            c={"dark"}
                            size="lg"
                            variant="outline"
                            leftSection={
                              <div className="w-1.5 h-1.5 bg-[#40c057] rounded-full"></div>
                            }
                          >
                            <Text fw={500} size="xs" tt="capitalize">
                              Свободен
                            </Text>
                          </Badge>
                        )}
                      </Group>

                      {isLgScreen && (
                        <ActionIcon
                          variant="transparent"
                          c={"gray"}
                          size={"lg"}
                          className="hover:bg-gray-100!"
                          onClick={() => {
                            closeDrawer();
                            setSelectedTableId(null);
                          }}
                        >
                          <X size={16} />
                        </ActionIcon>
                      )}
                    </Group>

                    <Group
                      justify="space-between"
                      px="md"
                      pb="md"
                      className="border-b border-gray-200"
                    >
                      <Stack gap={0}>
                        <Text c="gray" size="xs">
                          Мест
                        </Text>
                        <Text fw={500} size="xs">
                          {selectedTable?.seats}
                        </Text>
                      </Stack>

                      {selectedTableState === "occupied" && (
                        <>
                          <Stack gap={0}>
                            <Text c="gray" size="xs">
                              Официант
                            </Text>
                            <Text fw={500} size="xs">
                              {openOrderInSelectedTable?.waiterName}
                            </Text>
                          </Stack>

                          <Stack gap={0}>
                            <Text c="gray" size="xs">
                              Открыт
                            </Text>
                            <Text fw={500} size="xs">
                              {openOrderInSelectedTable?.openUntil} ·{" "}
                              {openOrderInSelectedTable?.elapsedTime}
                            </Text>
                          </Stack>
                        </>
                      )}
                    </Group>

                    <Group className="border-b border-gray-200">
                      {selectedTableState === "occupied" ? (
                        <ScrollArea
                          w="100%"
                          h={140}
                          scrollbarSize={9}
                          type="always"
                          scrollbars={"y"}
                        >
                          <Stack px="sm" pb="sm">
                            {(openOrderInSelectedTable?.orderItems.length ??
                            0 > 0) ? (
                              openOrderInSelectedTable?.orderItems.map(
                                (item) => (
                                  <Group justify="space-between">
                                    <Group gap={10}>
                                      <Text size="sm" fw={500}>
                                        {item.quantity}x
                                      </Text>
                                      <Stack gap={0}>
                                        <Text m={0} size="sm">
                                          {item.dish}
                                        </Text>
                                        <Text m={0} size="xs" c="yellow.9">
                                          {item.note}
                                        </Text>
                                      </Stack>
                                    </Group>

                                    {item.status === "ready" ? (
                                      <Badge
                                        color="green.1"
                                        c="teal.9"
                                        size="sm"
                                        tt="capitalize"
                                        rightSection={<Check size={10} />}
                                      >
                                        Готов
                                      </Badge>
                                    ) : item.status === "served" ? (
                                      <Badge
                                        color="green.3"
                                        c="teal.9"
                                        size="sm"
                                        tt="capitalize"
                                        rightSection={<CheckCheck size={10} />}
                                      >
                                        Подан
                                      </Badge>
                                    ) : (
                                      <Badge
                                        size="sm"
                                        tt="capitalize"
                                        color="blue.1"
                                        c="blue.9"
                                        rightSection={<Clock size={10} />}
                                      >
                                        <span>На</span>{" "}
                                        <span className="lowercase">кухне</span>
                                      </Badge>
                                    )}
                                  </Group>
                                ),
                              )
                            ) : (
                              <Text c="gray" size="sm" ta="center">
                                Блюда ещё не добавлены
                              </Text>
                            )}
                          </Stack>
                        </ScrollArea>
                      ) : selectedTableState === "reserved" ? (
                        <Stack
                          h={195}
                          py={"md"}
                          align="center"
                          justify="center"
                          gap={0}
                        >
                          <Armchair color="gray" />
                          <Text size="sm" fw={600} c="#7950f2" ta={"center"}>
                            Бронь на{" "}
                            {selectedTableReservation?.reservation_time.slice(0, 5)}
                          </Text>
                          <Text c="gray" size="sm" ta="center">
                            {selectedTableReservation?.client.first_name}{" "}
                            {selectedTableReservation?.client.last_name} ·{" "}
                            {selectedTableReservation?.guests_count} гост.
                          </Text>
                          <Text c="yellow.9" size="sm" ta="center">
                            Чтобы удалить стол, сначала отмените или закройте бронь в разделе «Брони»
                          </Text>
                        </Stack>
                      ) : (
                        <Stack
                          h={195}
                          py={"md"}
                          align="center"
                          justify="center"
                          gap={0}
                        >
                          <Armchair color="gray" />
                          <Text size="sm" fw={500} c="gray" ta={"center"}>
                            Стол свободен. Официант откроет заказ, когда посадит
                            гостей.
                          </Text>
                        </Stack>
                      )}
                    </Group>

                    {selectedTableState === "occupied" && (
                      <Group
                        px="md"
                        pb="sm"
                        className="border-b border-gray-200"
                        justify="space-between"
                      >
                        <Text fw={500} c="gray" size="xs">
                          Итого
                        </Text>
                        <Text fw={600}>
                          {openOrderInSelectedTable?.totalOrderPrice} сум
                        </Text>
                      </Group>
                    )}
                  </Stack>
                }
                actions={
                  <Group px="md" py="xs">
                    <Box w="80%">
                      {selectedTable && (
                        <UpdateTableButton oldData={selectedTable} />
                      )}
                    </Box>

                    <Box w="10%">
                      {selectedTable && (
                        <DeleteTableButton
                          table={selectedTable}
                          closeDrawer={closeDrawer}
                          afterDelete={() => setPage(1)}
                          isDisabled={selectedTableState === "reserved" || selectedTableState === "occupied"}
                        />
                      )}
                    </Box>
                  </Group>
                }
                isDrawerOpen={drawerOpened}
                onDrawerClose={closeDrawer}
                onDrawerOpen={openDrawer}
              />
            </Grid.Col>
          </Grid>
        </Stack>
      )}
    </>
  );
};
