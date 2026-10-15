import { Sidebar } from "@/03-widgets/Sidebar";
import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router";
import { useMediaQuery } from '@mantine/hooks';
import { useEffect } from "react";

export const AdminPanelLayout = () => {
  const [opened, { toggle }] = useDisclosure();
  const [collapsed, { close, open }] = useDisclosure();
  const collapseOnSm = useMediaQuery("(min-width: 769px)");
  const doNotCollapseOnMobile = useMediaQuery("(min-width: 576px)")

  // If breakpoint reaches 768px, sidebar collapses.
  // If it is bigger than 768px, it opens.
  useEffect(() => {
    collapseOnSm ? close() : open();
  }, [collapseOnSm]);

  return (
    <>
      <AppShell
          layout="alt"
          header={{ height: 60 }}
          navbar={{
            width: collapsed ? 80 : 250,
            breakpoint: "xs",
            collapsed: { mobile: !opened },
          }}
          padding="sm"
        >
          <AppShell.Header>
            <Group h="100%" px="md">
              <div className="border rounded-md p-0.5 border-[#dee2e6] xs:hidden">
                <Burger
                  opened={opened}
                  onClick={toggle}
                  hiddenFrom="xs"
                  size="xs"
                  color="gray"
                />
              </div>
              Header
            </Group>
          </AppShell.Header>

          <AppShell.Navbar p="xs" className={`max-xs:w-[85%]! max-xs:shadow-2xl`}>
            <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
            <Sidebar collapsed={doNotCollapseOnMobile && collapsed} />
          </AppShell.Navbar>
          
          <AppShell.Main>
            <Outlet />
          </AppShell.Main>
      </AppShell>
    </>
  );
};
