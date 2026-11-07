import {
  Group,
  Pagination,
  ScrollArea,
  Skeleton,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import type { InfoTableProps } from "../model/types";
import { Store } from "lucide-react";

export const InfoTable = ({
  bodyRows, headerRowsArray,
  fromItems, toItems, totalItems,
  totalPages, currentPage, onPageChange,
  isContentLoading,
}: InfoTableProps) => {
  return (
    <ScrollArea
      scrollbarSize={5}
      bdrs={"md"}
      bg={"white"}
      className="overflow-hidden border border-[#e9ecef]"
    >
      <Stack gap={0} justify="space-between" h={400}>
        <Table
          miw={650}
          highlightOnHover
          bg={"white"}
          verticalSpacing={"sm"}
          horizontalSpacing={"lg"}
          className="rounded-lg"
          stickyHeader
        >
          <Table.Thead>
            <Table.Tr>
              {headerRowsArray.map((col) => (
                <Table.Th key={col.id}>
                  <Text size="xs" fw={600} c={"gray.7"}>
                    {col.title}
                  </Text>
                </Table.Th>
              ))}
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {isContentLoading ? (
              <Table.Tr>
                <Table.Td>
                  <Group>
                    <Skeleton h={40} w={40} radius="xl" />
                    <Skeleton w={150} h={20} />
                  </Group>
                </Table.Td>

                <Table.Td>
                  <Skeleton w={70} h={20} />
                </Table.Td>

                <Table.Td>
                  <Skeleton w={70} h={20} />
                </Table.Td>
              </Table.Tr>
            ) : (
              bodyRows
            )}
          </Table.Tbody>
        </Table>

        {isContentLoading === false && totalItems === 0 && (
          <Stack gap={8} align="center" justify="center" h={340}>
            <Store color="gray" size={20} />
            <Text c={"gray"} fw={600} size="md">
              Ничего не найдено
            </Text>
          </Stack>
        )}

        {totalPages > 1 && (
          <Group
            justify="space-between"
            p={"md"}
            className="border-t border-gray-100 sticky bottom-0 z-10 bg-white"
          >
            <Text size="xs" c={"gray"}>
              <span>{fromItems}</span>-<span>{toItems}</span> из {totalItems}
            </Text>

            <Pagination.Root
              total={totalPages}
              value={currentPage}
              onChange={onPageChange}
            >
              <Group>
                <Pagination.Previous />
                <Text size="xs">
                  {currentPage} / {totalPages}
                </Text>
                <Pagination.Next />
              </Group>
            </Pagination.Root>
          </Group>
        )}
      </Stack>
    </ScrollArea>
  );
};
