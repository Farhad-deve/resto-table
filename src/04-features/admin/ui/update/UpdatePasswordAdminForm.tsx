import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Group, Stack, Text, TextInput } from "@mantine/core";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import {
  updatePasswordAdminSchema,
  type UpdatePasswordAdminFormData,
} from "../../model/schemas";
import { AlertCircle } from "lucide-react";

interface UpdatePasswordAdminFormProps {
  onFormSubmit: (values: UpdatePasswordAdminFormData) => void;
  children: ReactNode;
  errorMessage: string;
}

export const UpdatePasswordAdminForm = ({
  onFormSubmit,
  children,
  errorMessage,
}: UpdatePasswordAdminFormProps) => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordAdminFormData>({
    resolver: zodResolver(updatePasswordAdminSchema),
    defaultValues: {
      password: "",
    },
  });

  return (
    <form onSubmit={handleSubmit((values) => onFormSubmit(values))}>
      <Stack px={24} pb={16} gap={0}>
        <TextInput
          label="Пароль"
          placeholder="Не меньше 8 символов"
          {...register("password")}
          size="sm"
          error={errors.password?.message}
        />
        <Text size="xs" c={"gray"}>
          Не меньше 8 символов. Сообщите его администратору лично.
        </Text>

        {errorMessage && (
          <Alert variant="light" color="red">
            <Group gap={10}>
              <AlertCircle size={16} color="#C92A2A" />
              <Text c={"#C92A2A"} fw={500} size="sm">
                {errorMessage}
              </Text>
            </Group>
          </Alert>
        )}
      </Stack>

      {children}
    </form>
  );
};
