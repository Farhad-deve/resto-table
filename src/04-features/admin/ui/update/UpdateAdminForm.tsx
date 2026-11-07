import { Alert, Group, Stack, Text, TextInput } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { updateAdminSchema, type UpdateAdminFormData } from "../../model/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { PhoneInput } from "@/06-shared/ui";

interface UpdateAdminFormProps {
  onFormSubmit: (values: UpdateAdminFormData) => void;
  children: ReactNode;
  errorMessage: string;
  defaultData: Partial<UpdateAdminFormData>;
}

export const UpdateAdminForm = ({
  onFormSubmit,
  children,
  errorMessage,
  defaultData 
}: UpdateAdminFormProps) => {

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateAdminFormData>({
    resolver: zodResolver(updateAdminSchema),
    defaultValues: {
      first_name: defaultData.first_name,
      last_name: defaultData.last_name,
      phone_number: defaultData.phone_number,
    },
  });

  return (
    <form onSubmit={handleSubmit((values) => onFormSubmit(values))}>
      <Stack>
        <Stack px={24}>
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
      </Stack>
    </form>
  );
};
