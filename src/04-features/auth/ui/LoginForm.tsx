import {
  Alert,
  Anchor,
  Button,
  PasswordInput,
  Stack,
  Text,
} from "@mantine/core";
import { AlertCircle } from "lucide-react";
import type { Mode } from "../model/types";
import { useForm, Controller } from "react-hook-form";
import { loginSchema, type LoginFormData } from "../model/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { PhoneInput } from "@/06-shared/ui/PhoneInput";
import { useLogin } from "../model/useLogin";

interface LoginFormProps {
  onSwitchToRegister: (mode: Mode) => void;
}

export const LoginForm = ({ onSwitchToRegister }: LoginFormProps) => {
  const { mutate, isPending, isError } = useLogin();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone_number: "",
      password: "",
    },
  });

  return (
    <form onSubmit={handleSubmit((values) => mutate(values))}>
      <div className="flex flex-col justify-between gap-4 w-full h-full">
        <Stack>
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
          <Stack gap={0}>
            <PasswordInput
              label="Пароль"
              {...register("password")}
              placeholder="Пароль"
              error={errors.password?.message}
            />
          </Stack>

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
            Войти
          </Button>

          <div>
            <Anchor
              c={"teal.6"}
              className="cursor-pointer"
              fw={"600"}
              size={"sm"}
              onClick={() => onSwitchToRegister("register")}
            >
              Впервые у нас? Регистрация гостя
            </Anchor>
          </div>
        </Stack>
      </div>
    </form>
  );
};
