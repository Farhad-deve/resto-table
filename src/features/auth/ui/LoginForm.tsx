import {
  Alert,
  Anchor,
  Button,
  Group,
  InputBase,
  PasswordInput,
  Stack,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { IMaskInput } from "react-imask";
import { AlertCircle } from "lucide-react";
import type { Mode } from "../model/types";
import { useForm } from "react-hook-form"
import { loginSchema, type LoginFormData } from "../model/schemas";
import { zodResolver } from "@hookform/resolvers/zod"

interface LoginFormProps {
  onSwitchToRegister: (mode : Mode) => void
}

export const LoginForm = ({ onSwitchToRegister } : LoginFormProps) => {
  const [value, setValue] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  return (
    <form>
      <div className="flex flex-col justify-between gap-4 w-full h-full">
        <Stack>
          <InputBase inputMode="numeric"
            {...register("phone_number")}
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
              <Text size={"sm"} fw={600}>
                Пароль
              </Text>
              <Anchor c={"teal.6"} ta={"right"} size="sm" fw={500}>
                Забыли пароль?
              </Anchor>
            </Group>
            <PasswordInput
              {...register("password")}
              type="password"
              placeholder="Пароль"
            />
          </Stack>

          {/* vv Error message alert vv */}
          <Alert variant="light" color="red" icon={<AlertCircle size={16} />}>
            <Text c={"#C92A2A"} fw={500} size="sm">
              Неверный телефон или пароль
            </Text>
          </Alert>
        </Stack>

        <Stack className="text-center" gap={4}>
          <Button type="submit" h={40} onClick={(e) => e.preventDefault()}>
            Войти
          </Button>

          <div>
            <Anchor
              c={"teal.6"}
              className="cursor-pointer"
              fw={"600"}
              size={"sm"}
              onClick={() =>
                onSwitchToRegister("register")
              }
            >
              Впервые у нас? Регистрация гостя"
            </Anchor>
          </div>
        </Stack>
      </div>
    </form>
  );
};
