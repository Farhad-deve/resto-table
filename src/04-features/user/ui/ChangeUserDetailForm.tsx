import { PhoneInput, SubmitButton } from "@/06-shared/ui";
import { Alert, Group, Stack, Text, TextInput } from "@mantine/core";
import { AlertCircle, Save } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { userSchema, type UpdateUserFormData } from "../model/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateMe, type User } from "@/05-entities/user";
import { getErrorMessage } from "@/06-shared/utils";
import { userToFormValues } from "../utils/userToFormValues";

interface ChangeUserDetailFormProps {
  defaultData: User;
  onSave: () => void;
}

export const ChangeUserDetailForm = ({
  defaultData,
  onSave,
}: ChangeUserDetailFormProps) => {
  const {
    mutate: updateMe,
    isPending: isUpdating,
    isError,
    error,
  } = useUpdateMe();

  const {
    control,
    register,
    formState: { errors, isDirty },
    handleSubmit,
  } = useForm<UpdateUserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: userToFormValues(defaultData),
  });

  return (
    <form
      onSubmit={handleSubmit((values) =>
        updateMe(values, { onSuccess: () => onSave() }),
      )}
    >
      <Stack px={24}>
        <Stack>
          <Text fw={600} size="sm">
            Личные данные
          </Text>

          <Group>
            <TextInput
              label="Имя"
              placeholder="Введите имя"
              {...register("first_name")}
              size="sm"
              flex={1}
              error={errors.first_name?.message}
            />
            <TextInput
              label="Фамилия"
              placeholder="Введите фамиля"
              {...register("last_name")}
              size="sm"
              flex={1}
              error={errors.last_name?.message}
            />
          </Group>

          <Controller
            name="phone_number"
            control={control}
            render={({ field }) => (
              <PhoneInput
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={errors.phone_number?.message}
              />
            )}
          />

          <TextInput
            label="Email"
            placeholder="name@mail.com"
            {...register("email")}
            size="sm"
          />
        </Stack>

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

        <Group justify="flex-end">
          <SubmitButton
            children="Сохранить"
            leftSection={<Save size={16} />}
            isDisabled={!isDirty}
            isSubmitLoading={isUpdating}
          />
        </Group>
      </Stack>
    </form>
  );
};
