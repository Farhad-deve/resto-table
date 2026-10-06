import {
  Alert,
  Anchor,
  Button,
  InputBase,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import type { Mode } from "../model/types";
import { AlertCircle } from "lucide-react";
import { IMaskInput } from "react-imask";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerSchema, type RegisterFormData } from "../model/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

interface RegisterFormProps {
  onSwitchToLogin: (mode: Mode) => void;
}

export const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const [value, setValue] = useState("");

  const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  return (
    <form className="h-full">
      <div className="flex flex-col justify-between gap-4 w-full h-full">
        <Stack>
          <Stack>
            <div className="flex gap-3 flex-col lg:flex-row">
              <TextInput type="text"
                {...register("first_name")}
                autoComplete="name"
                placeholder="Ваше имя"
                label="Имя"
                flex={1}
              />
              <TextInput type="text"
                {...register("last_name")}
                placeholder="Ваша фамилия"
                label="Фамилия"
                flex={1}
              />
            </div>
            <TextInput type="email"
              {...register("email")}
              placeholder="Ваша электронная почта"
              label="Электронная почта"
            />
          </Stack>

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

          <PasswordInput type="password"
            {...register("password")}
            label="Пароль"
            placeholder="Не менее 6 символов"
          />

          {/* vv Error message alert vv */}
          <Alert variant="light" color="red" icon={<AlertCircle size={16} />}>
            <Text c={"#C92A2A"} fw={500} size="sm">
              Неверный телефон или пароль
            </Text>
          </Alert>
        </Stack>

        <Stack className="text-center" gap={4}>
          <Button type="submit" h={40} onClick={(e) => e.preventDefault()}>
            Создать аккаунт
          </Button>

          <div>
            <Anchor
              c={"teal.6"}
              className="cursor-pointer"
              fw={"600"}
              size={"sm"}
              onClick={() => onSwitchToLogin("login")}
            >
              Уже есть аккаунт? Войти
            </Anchor>
          </div>
        </Stack>
      </div>
    </form>
  );
};
