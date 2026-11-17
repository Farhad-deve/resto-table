import { CreateTableButton } from "@/04-features/restaurantAdmin";
import { useRestAdminStats, useTables } from "@/05-entities/restaurantAdmin";
import { useMyRestaurantId } from "@/05-entities/user";
import { DetailDrawer } from "@/06-shared/ui";
import { Group, ColorSwatch, Stack, Text, Tabs, Grid } from "@mantine/core";
import { useState } from "react";

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
  const restId = useMyRestaurantId();
  const { data: restAdminStats } = useRestAdminStats(restId, true);
  const { data: tables } = useTables(restId, {
    page: page,
    page_size: 12,
    status: isActiveByTab[activeTab],
  });

  const restTables = restAdminStats?.tables;
  const restRseservations = restAdminStats?.reservations;

  return (
    <Stack gap={"lg"}>
      <Group justify="space-between" align="flex-end">
        <Stack gap={0}>
          <Text size="xl" fw={600}>
            Столы
          </Text>
          <Text size="sm" c="gray">
            {restTables?.total} столов · свободно {restTables?.free} · броней
            сегодня {restRseservations?.today}
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
        <Grid.Col>
          
        </Grid.Col>

        <Grid.Col>
          {/* <DetailDrawer /> */}
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
