import {
  Anchor,
  Button,
  Box,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
  InputBase,
  Alert,
} from "@mantine/core";
import { useState } from "react";
import Logo from "/logo.svg";
import GreenLogo from '/favicon.svg'
import { IMaskInput } from "react-imask";
import { AlertCircle } from "lucide-react";

export const LogRegPage = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [value, setValue] = useState("");

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
                {mode === "register" && <img src={GreenLogo} alt="RestoTable logo" className="w-10" />}
              </div>
              <Title>{mode === "login" ? "Вход" : "Регистрация"}</Title>
              <Text c={"dimmed"} size="sm">{mode === "login" ? "Для сотрудников и гостей" : "Бронируйте столы в ресторанах города и следите за статусом"}</Text>
            </Stack>

            <form className="h-full">
              <div className="flex flex-col justify-between gap-4 w-full h-full">
                <Stack>
                  {mode === "register" && <TextInput name="name" autoComplete="name" placeholder="Как к вам обращаться" label="Имя" />}
                  <InputBase inputMode="numeric"
                    name="phone"
                    autoComplete="tel-national"
                    label="Телефон"
                    component={IMaskInput}
                    value={value}
                    mask={"00 000 00 00"}
                    onAccept={(_value, maskRef) => setValue(maskRef.value)}
                    leftSection={<Text size="sm">+998</Text>}
                    leftSectionWidth={55}
                    leftSectionPointerEvents="none"
                    placeholder="90 123 45 67"
                  />
                  <Stack gap={0}>
                    <Group justify="space-between">
                      <Text size={"sm"} fw={600}>Пароль</Text>
                      {mode === "login" && <Anchor c={"teal.6"} ta={"right"} size="sm" fw={500}>Забыли пароль?</Anchor>}
                    </Group>
                    <PasswordInput name="password" type="password" placeholder={mode === "login" ? "Пароль" : "Не менее 6 символов"} />
                  </Stack>
                  <Alert variant="light" color="red" icon={<AlertCircle size={16} />} >
                    <Text c={"#C92A2A"} fw={500} size="sm">Неверный телефон или пароль</Text>
                  </Alert>
                </Stack>

                <Stack className="text-center" gap={4}>
                  <Button type="submit" h={40} onClick={(e) => e.preventDefault()}>
                    {mode === "login" ? "Войти" : "Создать аккаунт"}
                  </Button>

                  <div>
                    <Anchor
                      c={"teal.6"}
                      className="cursor-pointer"
                      fw={"600"}
                      size={"sm"}
                      onClick={() =>
                        setMode((prev) => (prev === "login" ? "register" : "login"))
                      }
                    >
                      {mode === "login"
                        ? "Впервые у нас? Регистрация гостя"
                        : "Уже есть аккаунт? Войти"}
                    </Anchor>
                  </div>
                </Stack>
              </div>
            </form>
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
