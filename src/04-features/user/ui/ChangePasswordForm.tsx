import { Group, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import {
  updatePasswordSchema,
  type UpdatePasswordFormData,
} from "../model/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export const ChangePasswordForm = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
    },
  });

  return (
    <form>
      <Stack px={24}>
        <Text>Смена пароля</Text>

        <Group>
          <TextInput
            label="Пароль"
            placeholder="Не меньше 8 символов"
            {...register("old_password")}
            size="sm"
            error={errors.old_password?.message}
          />

          <TextInput
            label="Пароль"
            placeholder="Не меньше 8 символов"
            {...register("old_password")}
            size="sm"
            error={errors.old_password?.message}
          />
        </Group>
      </Stack>
    </form>
  );
};
