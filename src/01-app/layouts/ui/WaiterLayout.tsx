import { Header } from "@/03-widgets/Header"
import { AppShell, Button, Group, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { Calendar } from "lucide-react"
import { Outlet } from "react-router"

export const WaiterLayout = () => {
  const [opened] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "xs",
        collapsed: { mobile: !opened },
      }}
      aside={{
        width: 350,
        breakpoint: "sm",
      }}
      padding="sm"
      bg={"#f8f9fa"}
    >
      <AppShell.Header>
        <Group h="100%" w={"100%"}>
          <Header
            logoName={
              <Text fw={600} size="xl">
                Столы
              </Text>
            }
            tabs={
              <Button variant="outline" bdrs={"sm"} color="#dee2e6" c={"dark"} px={"sm"}>
                <Group gap={7} align="center">
                  <Calendar size={16}  />
                  <Text size="sm" fw={500}>Брони сегодня</Text>
                </Group>
              </Button>
            }
          />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar>
        Navbar
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>

      <AppShell.Aside>
        Aside
      </AppShell.Aside>
    </AppShell>
  )
}
