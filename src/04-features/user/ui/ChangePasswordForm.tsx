import { Alert, Group, PasswordInput, Stack, Text } from "@mantine/core";
import { useForm } from "react-hook-form";
import {
  updatePasswordSchema,
  type UpdatePasswordFormData,
} from "../model/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitButton } from "@/06-shared/ui";
import { AlertCircle, Lock } from "lucide-react";
import { useChangePasswordMe } from "@/05-entities/user";
import { getErrorMessage } from "@/06-shared/utils";

interface ChangePasswordFormProps {
  onSave: () => void;
}

export const ChangePasswordForm = ({ onSave }: ChangePasswordFormProps) => {
  const { mutate: changePassword, isPending: isChangePending, isError, error } = useChangePasswordMe();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit((values) =>
        changePassword(values, {
          onSuccess: () => {
            onSave();
          },
        }),
      )}
    >
      <Stack px={20}>
        <Text fw={600}>Смена пароля</Text>

        <PasswordInput
          label="Текущий пароль"
          placeholder="Введите текущий пароль"
          {...register("old_password")}
          size="sm"
          error={errors.old_password?.message}
        />

        <PasswordInput
          label="Новый пароль"
          placeholder="Не меньше 8 символов"
          {...register("new_password")}
          size="sm"
          error={errors.new_password?.message}
        />

        <Group justify="flex-end">
          <SubmitButton
            children="Изменить пароль"
            leftSection={<Lock size={16} />}
            isDisabled={!isDirty}
            isSubmitLoading={isChangePending}
          />
        </Group>

        <Text mb={5} size="xs" c={"gray"}>
          Другие устройства останутся в системе до окончания срока сессии.
        </Text>

        {isError && (
          <Alert variant="light" color="red">
            <Group gap={10}>
              <AlertCircle size={16} color="#C92A2A" />
              <Text c={"#C92A2A"} fw={500} size="sm">
                {getErrorMessage(error)}
              </Text>
            </Group>
          </Alert>
        )}
      </Stack>
    </form>
  );
};
