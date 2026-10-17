import { useLogout } from "@/04-features/auth"
import { useMe } from "@/05-entities/user";
import { ProfileButton } from "@/06-shared/ui/ProfileButton"
import { Group } from "@mantine/core"


export const Header = () => {
    const { mutate: logout } = useLogout();
    const { data: user } = useMe();

  return (
    <Group>
      <ProfileButton user={user} onLogout={logout} />
    </Group>
  )
}
