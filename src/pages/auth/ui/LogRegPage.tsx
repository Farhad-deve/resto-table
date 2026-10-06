import {
  Anchor,
  Box,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import Logo from "/logo.svg";
import GreenLogo from '/favicon.svg'
import { LoginForm, RegisterForm, type Mode } from "@/features/auth";
import { useState } from "react";

export const LogRegPage = () => {
  const [mode, setMode] = useState<Mode>("login");

  return ( 
    <div className="min-h-screen flex justify-between p-1.5">
      <div className="w-full hidden p-1.5 lg:block">
        <Stack bg={"teal.9"} justify="space-between" bdrs={"xl"} p={30} className="w-full h-full">
          <Group>
            <img src={Logo} alt="RestoTable" />
            <Text c={"white"} fw={600}>RestoTable</Text>
          </Group>

          <Stack>
            <Stack>
              <Group>
                <Box bg="#FFFFFF2E" w={26} h={26} bdrs={"50%"} />
                <Box bg="#FFFFFF2E" w={26} h={26} bdrs={"50%"} />
                <Box bg="#FFFFFF" w={26} h={26} bdrs={"50%"} />
                <Box bg="#FFFFFF2E" w={26} h={26} bdrs={"50%"} />
                <Box bg="#FFFFFF2E" w={26} h={26} bdrs={"50%"} />
                <Box bg="#FFFFFF2E" w={26} h={26} bdrs={"50%"} />
              </Group>

              <Group>
                <Box bg="#FFFFFF2E" w={26} h={26} bdrs={"50%"} />
                <Box bg="#FFFFFF2E" w={26} h={26} bdrs={"50%"} />
                <Box bg="#FFFFFF2E" w={26} h={26} bdrs={"50%"} />
                <Box bg="#FFFFFF" w={26} h={26} bdrs={"50%"} />
                <Box bg="#FFFFFF2E" w={26} h={26} bdrs={"50%"} />
                <Box bg="#FFFFFF2E" w={26} h={26} bdrs={"50%"} />
              </Group>
            </Stack>

            <Stack gap={2}>
              <Title c={"white"} maw={260} size={30}>Весь ресторан в одной системе</Title>
              <Text c={"teal.1"} size="sm" maw={280}>
                Официант принимает заказ, кухня сразу
                видит его на экране, а склад списывает
                продукты автоматически
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </div>

      <Stack className="w-full" gap={0}>
        <Stack align="center" justify="center" className="h-full">
          <Stack gap={5} px={5} className={`w-[clamp(260px,95%,600px)] ${mode === "register" ? "h-[90%]" : ""}`}>
            <Stack gap={4}>
              <div>
                {mode === "register" && <img src={GreenLogo} alt="RestoTable logo" className="w-10 pointer-events-none" />}
              </div>
              <Title>{mode === "login" ? "Вход" : "Регистрация"}</Title>
              <Text c={"dimmed"} size="sm">{mode === "login" ? "Для сотрудников и гостей" : "Бронируйте столы в ресторанах города и следите за статусом"}</Text>
            </Stack>

            {mode === "login" ? <LoginForm onSwitchToRegister={setMode} /> : <RegisterForm onSwitchToLogin={setMode} />}
          </Stack>
        </Stack>

        {mode === "login" && (
          <Group justify="center" c={"dimmed"} align="flex-end">
            <Text size="sm">
              © 2026 RestoTable
            </Text>

            <Anchor c={"dimmed"} size="sm">
              Поддержка
            </Anchor>
          </Group>
        )}
      </Stack>
    </div>
  );
};
