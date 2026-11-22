import {
  Badge,
  Card,
  Group,
  Stack,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import type { Table } from "../model/types";
import { BellRing } from "lucide-react";
import { tableLook } from "../config/constans";
import { getTableDisplayState } from "../utils/getTableDisplayState";

interface TableCardProps {
  table: Table;
  totalPrice?: string;
  waiterName?: string;
  elapsedTime?: string;
  readyDishesNumber?: number;
  isReserved: boolean;
  reservationTime: string;
  guestsCount: number;
  clientName: string;
}

export const TableCard = ({
  table,
  totalPrice,
  waiterName,
  elapsedTime,
  readyDishesNumber,
  isReserved,
  reservationTime,
  clientName,
  guestsCount
}: TableCardProps) => {
  const tableState = getTableDisplayState(table.status, isReserved);
  const look = tableLook[tableState];

  function renderTableCardLook() {
    switch (tableState) {
      case "free":
        return (
          <Text c="gray.5" size="xs" fw={500}>
            Можно посадить
          </Text>
        );
      case "occupied":
        return (
          <Stack gap={0}>
            <Text fw={600}>{totalPrice} сум</Text>
            <Text fw={500} c="gray" size="xs">{waiterName} · {elapsedTime}</Text>
          </Stack>
        );
      case "reserved":
        return (
          <Stack gap={0}>
            <Text size="sm" fw={500}>{reservationTime}</Text>
            <Text c="gray" size="xs" fw={500}>
              {guestsCount} гост · {clientName}
            </Text>
          </Stack>
        )
    }
  }

  return (
    <UnstyledButton w={"100%"} h={130}>
      <Card p="sm" withBorder h="100%" className="cursor-pointer">
        <Stack h="100%" justify="space-between">
          <Group justify="space-between" align="flex-start">
            <Group gap={10}>
              <ThemeIcon size="lg" bdrs={"md"} color={look.bgColor}>
                <Text c={look.color} fw={600}>
                  {table.number}
                </Text>
              </ThemeIcon>

              <Stack gap={0}>
                <Text size="sm" fw={600} c={look.color}>
                  {look.statusName}
                </Text>
                <Text size="xs" c="gray">
                  {table.seats} места
                </Text>
              </Stack>
            </Group>

            {tableState === "occupied" && (readyDishesNumber ?? 0) > 0 && (
              <Badge
                color="green.1"
                c="teal.9"
                size="xs"
                leftSection={<BellRing size={10} />}
              >
                {readyDishesNumber}
              </Badge>
            )}
          </Group>

          <Stack>
            {renderTableCardLook()}
          </Stack>
        </Stack>
      </Card>
    </UnstyledButton>
  );
};
