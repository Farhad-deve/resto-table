import {
  Alert,
  Anchor,
  Button,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import type { Mode } from "../model/types";
import { AlertCircle } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { registerSchema, type RegisterFormData } from "../model/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../model/useRegister";
import { PhoneInput } from "@/06-shared/ui/PhoneInput";

interface RegisterFormProps {
  onSwitchToLogin: (mode: Mode) => void;
}

export const RegisterForm = ({ onSwitchToLogin }: RegisterFormProps) => {
  const { mutate, isPending, isError } = useRegister(() =>
    onSwitchToLogin("login"),
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      phone_number: "",
      password: "",
      first_name: "",
      last_name: "",
    },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => mutate(values))}
      className="h-full"
    >
      <div className="flex flex-col justify-between gap-4 w-full h-full">
        <Stack>
          <Stack>
            <div className="flex gap-3 flex-col lg:flex-row">
              <TextInput
                type="text"
                {...register("first_name")}
                autoComplete="name"
                placeholder="Ваше имя"
                label="Имя"
                flex={1}
                error={errors.first_name?.message}
              />
              <TextInput
                type="text"
                {...register("last_name")}
                placeholder="Ваша фамилия"
                label="Фамилия"
                flex={1}
                error={errors.last_name?.message}
              />
            </div>
          </Stack>

          <Controller
            control={control}
            name="phone_number"
            render={({ field }) => (
              <PhoneInput
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={errors.phone_number?.message}
              />
            )}
          />

          <PasswordInput
            type="password"
            {...register("password")}
            label="Пароль"
            placeholder="Не менее 8 символов"
            error={errors.password?.message}
          />

          {/* vv Error message alert vv */}
          {isError && (
            <Alert variant="light" color="red" icon={<AlertCircle size={16} />}>
              <Text c={"#C92A2A"} fw={500} size="sm">
                Неверный телефон или пароль
              </Text>
            </Alert>
          )}
        </Stack>

        <Stack className="text-center" gap={4}>
          <Button loading={isPending} type="submit" h={40}>
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
