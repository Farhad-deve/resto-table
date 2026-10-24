import { KitchenHeader } from "@/03-widgets/Header"
import { AppShell, Group } from "@mantine/core"

export const KitchenLayout = () => {
  return (
    <AppShell
      header={{ height: 60 }}
    >
      <AppShell.Header>
        <Group w="100%" h="100%">
          <KitchenHeader />
        </Group>
      </AppShell.Header>

      <AppShell.Main>

      </AppShell.Main>
    </AppShell>
  )
}
