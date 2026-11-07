import { ActionIcon, Avatar, Grid, Group, Stack, Table, Text } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useState } from "react";
import { Shield, X } from "lucide-react";
import { CreateAdminButton, DeleteAdminButton, UpdateAdminButton, UpdatePasswordAdminButton } from "@/04-features/admin";
import { useAdmins } from "@/05-entities/admin";
import { formatPhoneNumber, calculatePageItems, } from "@/06-shared/utils";
import { InfoTable, DetailDrawer } from "@/06-shared/ui";
import { AdminsTableHeaderData } from "../config/TableData";

export const SuperAdminAdminsPage = () => {
  const [page, setPage] = useState(1);
  const [selectedAdminId, setSelectedAdminId] = useState<number | null>(null); 

  const { data: admins, isPending: isAdminsPending } = useAdmins({ page: page });

  const [drawerOpened, { open: openDrawer, close: closeDrawer }] = useDisclosure();

  const selectedAdmin = admins?.results.find((admin) => admin.id === selectedAdminId);

  const isLgScreen = useMediaQuery("(min-width: 1200px)");

  const TableBodyRows = admins?.results.map((admin) => (
    <Table.Tr
      key={admin.id}
      className={`cursor-pointer border-b! border-[#f1f3f5]! ${selectedAdmin?.id === admin.id ? "bg-teal-50!" : ""}`}
      onClick={() => {
        openDrawer();
        setSelectedAdminId(admin.id);
      }}
    >
      <Table.Td>
        <Group gap={10}>
          <Avatar variant="light" color="teal.1" size={"sm"}>
            {admin.first_name.charAt(0).toUpperCase()}
            {admin.last_name.charAt(0).toUpperCase()}
          </Avatar>

          <Text fw={500} size="sm">
            {admin.first_name} {admin.last_name}
          </Text>
        </Group>
      </Table.Td>

      <Table.Td>
        <Text size="xs" c="gray">
          {formatPhoneNumber(admin.phone_number)}
        </Text>
      </Table.Td>

      <Table.Td>
        <Text size="sm">{admin.restaurant_name}</Text>
      </Table.Td>
    </Table.Tr>
  ));

  const { fromItemsIndex, toItemsIndex, TotalPages } = calculatePageItems(
    page,
    admins?.count ?? 0,
    admins?.results.length ?? 0,
  );

  return (
    <Stack gap={"lg"}>
      <Group align="flex-end" justify="space-between">
        <Stack gap={0}>
          <Text size="xl" fw={600}>
            Администраторы ресторанов
          </Text>
          <Text c={"gray"} size="sm">
            Здесь назначают администратора ресторану; остальных сотрудников он
            добавляет сам
          </Text>
        </Stack>

        <CreateAdminButton  />
      </Group>

      <Grid>
        <Grid.Col span={{ base: 12, lg: 8.5 }}>
          <InfoTable
            headerRowsArray={AdminsTableHeaderData}
            bodyRows={TableBodyRows}
            fromItems={fromItemsIndex}
            toItems={toItemsIndex}
            totalItems={admins?.count ?? 0}
            totalPages={TotalPages}
            currentPage={page}
            onPageChange={setPage}
            isContentLoading={isAdminsPending}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 3.5 }}>
          <DetailDrawer
            EmptyStateIcon={Shield}
            emptyStateText="Выберите администратора, чтобы увидеть детали."
            drawerTitle="Администратор"
            isDrawerOpen={drawerOpened}
            onDrawerOpen={openDrawer}
            onDrawerClose={closeDrawer}
            content={
              <Stack gap={0}>
                <Stack
                  p={"xs"}
                  gap={10}
                  style={{ borderBottom: "1px solid #efefef" }}
                >
                  <Group justify="space-between">
                    <Group gap={10}>
                      <Avatar variant="light" color="teal.1" size={"lg"}>
                        <Text fw={600} size="lg">
                          {selectedAdmin?.first_name.charAt(0).toUpperCase()}
                          {selectedAdmin?.last_name.charAt(0).toUpperCase()}
                        </Text>
                      </Avatar>
                      <Stack gap={0}>
                        <Text fw={600}>
                          {selectedAdmin?.first_name} {selectedAdmin?.last_name}
                        </Text>
                        <Text size="xs" c={"gray"}>
                          Администратор ресторана
                        </Text>
                      </Stack>
                    </Group>

                    {isLgScreen && (
                      <ActionIcon
                        variant="transparent"
                        c={"gray"}
                        size={"lg"}
                        className="hover:bg-gray-100!"
                        onClick={() => {
                          closeDrawer();
                          setSelectedAdminId(null);
                        }}
                      >
                        <X size={16} />
                      </ActionIcon>
                    )}
                  </Group>
                </Stack>

                <Group
                  p={"xs"}
                  style={{ borderBottom: "1px solid #efefef" }}
                  gap={"lg"}
                >
                  <Stack gap={0}>
                    <Text size="xs" c={"gray"}>
                      Телефон (логин)
                    </Text>
                    <Text size="xs" fw={500} c={"dark"}>
                      {formatPhoneNumber(selectedAdmin?.phone_number ?? "")}
                    </Text>
                  </Stack>

                  <Stack gap={0}>
                    <Text size="xs" c={"gray"}>
                      Ресторан
                    </Text>
                    <Text size="xs" fw={500} c={"dark"}>
                      {selectedAdmin?.restaurant_name}
                    </Text>
                  </Stack>
                </Group>
              </Stack>
            }
            actions={
              <Stack p={"xs"} gap={"xs"}>
                {selectedAdmin &&
                  <UpdateAdminButton oldData={selectedAdmin} />
                }

                {selectedAdmin &&
                  <UpdatePasswordAdminButton adminId={selectedAdmin.id} adminName={selectedAdmin.first_name + " " + selectedAdmin.last_name} />
                }

                {selectedAdmin && (
                  <DeleteAdminButton admin={selectedAdmin} closeDrawer={closeDrawer} />
                )}
              </Stack>
            }
          />
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
