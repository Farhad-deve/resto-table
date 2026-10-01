import {
  Anchor,
  Box,
  Button,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";
import Logo from "/logo.svg";

export const LogRegPage = () => {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <>
    <div className="min-h-screen flex items-center">
      <Box bg={"teal.9"} bdrs={"lg"} p={10} className=" w-full">
        <Group>
          <img src={Logo} alt="RestoTable" />
          <Title c={"white"}>RestoTable</Title>
        </Group>
      </Box>

      <Stack align="center" justify="center" className="h-full w-full">
        <Stack gap={3} px={10} className="h-full w-[clamp(300px,60%,600px)]">
          <Title>Вход</Title>
          <Text c={"dimmed"} size="sm">Для сотрудников и гостей</Text>
          <form>
            <div className="flex flex-col justify-center gap-4 w-full">
              <TextInput
                inputMode="numeric"
                label="Телефон"
                leftSection={<Text size="sm">+998</Text>}
                leftSectionWidth={55}
                leftSectionPointerEvents="none"
                placeholder="90 123 45 67"
              />
              <Stack gap={0}>
                <Group justify="space-between">
                  <Text size={"sm"} fw={600}>Пароль</Text>
                  <Anchor c={"teal.6"} ta={"right"} size="sm" fw={500}>Забыли пароль?</Anchor>
                </Group>
                <PasswordInput placeholder="Пароль" />
              </Stack>
              <Button type="submit" onClick={(e) => e.preventDefault()}>
                {mode === "login" ? "Войти" : "Создать аккаунт"}
              </Button>

              {/* This text changes mode */}
              <Anchor
                c={"teal.6"}
                className="cursor-pointer"
                fw={"600"}
                size={"sm"}
                ta={"center"}
                onClick={() =>
                  setMode((prev) => (prev === "login" ? "register" : "login"))
                }
              >
                {mode === "login"
                  ? "Впервые у нас? Регистрация гостя"
                  : "Уже есть аккаунт? Войти"}
              </Anchor>
            </div>
          </form>
        </Stack>
      </Stack>
    </div>
    </>
  );
};
