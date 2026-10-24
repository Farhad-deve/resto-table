import { LogoutButton } from "@/04-features/auth";
import { useMe } from "@/05-entities/user";
import { ProfileButton } from "@/06-shared/ui/ProfileButton";
import { Group } from "@mantine/core";
import type { ReactElement } from "react";
import { Link } from "react-router";

interface HeaderProps {
  tabs?: ReactElement;
  logoName?: ReactElement;
}

export const Header = ({ tabs, logoName } : HeaderProps) => {
  const { data: user } = useMe();

  return (
    <header className="max-w-[1540px] w-full mx-auto">
      <Group justify="space-between" px={"sm"} align="center" w={"100%"}>
        <Group>
          <Link to="/">
            <Group gap={10}>
              <img src="/favicon.svg" alt="Logo" className="w-8" />
              {logoName}
            </Group>
          </Link>

          <Group>
            {tabs}
          </Group>
        </Group>

        <ProfileButton user={user} rightSection={<LogoutButton />} />
      </Group>
    </header>
  );
};
