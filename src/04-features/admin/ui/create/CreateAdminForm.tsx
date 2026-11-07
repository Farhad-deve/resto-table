import { Alert, Group, Select, Stack, Text, TextInput } from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { createAdminSchema, type CreateAdminFormData } from "../../model/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { type RestaurantWithAdmin } from "@/05-entities/restaurant";
import { PhoneInput } from "@/06-shared/ui";

interface CreateAdminFormProps {
  onFormSubmit: (values: CreateAdminFormData) => void;
  children: ReactNode;
  errorMessage: string;
  restaurantsWithoutAdmin: RestaurantWithAdmin[];
}

export const CreateAdminForm = ({
  onFormSubmit,
  children,
  errorMessage,
  restaurantsWithoutAdmin,
}: CreateAdminFormProps) => {
  const options = restaurantsWithoutAdmin?.map((rest) => ({
    value: rest.id,
    label: rest.name,
  }));

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAdminFormData>({
    resolver: zodResolver(createAdminSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone_number: "",
      password: "",
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
          
          <Stack gap={0}>
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
          </Stack>
          

          <Stack gap={0}>
            <Controller
              name="restaurant"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Ресторан"
                    placeholder="Выберите ресторан без администратора"
                    searchable
                    nothingFoundMessage="Ничего не найдено"
                    data={options}
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.restaurant?.message}
                    disabled={!restaurantsWithoutAdmin?.length}
                  />
              )}
            />
            {!restaurantsWithoutAdmin?.length && (
              <Text c={"gray"} size="xs">
                У всех ресторанов уже есть администратор. Создайте новый
                ресторан в разделе «Рестораны».
              </Text>
            )}
          </Stack>

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
