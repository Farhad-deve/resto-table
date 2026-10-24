import { Header } from "@/03-widgets/Header"
import { AppShell, Group, Tabs, Text } from "@mantine/core"
import { Calendar, Store } from "lucide-react"
import { Link, Outlet } from "react-router"

export const CustomerLayout = () => {
  return (
    <AppShell
      header={{ height: 60 }}

      padding="sm"
      bg={"#f8f9fa"}
    >
      <AppShell.Header>
        <Group w="100%" h="100%">
          <Header
            logoName={
              <Text fw={600} size="lg">
                Resto
                <span className="text-[#099268]">Table</span>
              </Text>
            }
            tabs={
              <Tabs defaultValue="restaurants" variant="pills">
                <Group gap={10}>
                  <Link to={"restaurants"}>
                    <Tabs.Tab value="restaurants" fw={600} px={"sm"}>
                      <Group gap={12}>
                        <Store size={18}  />
                        Рестораны
                      </Group>
                    </Tabs.Tab>
                  </Link>

                  <Link to={"reservations"}>
                    <Tabs.Tab value="reservations" fw={600} px={"sm"}>
                      <Group gap={12}>
                        <Calendar size={18} />
                        Брони
                      </Group>
                    </Tabs.Tab>
                  </Link>
                </Group>
              </Tabs>
            }
          />
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
