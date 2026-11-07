import { PhoneInput } from "@/06-shared/ui";
import { Alert, Group, Stack, Text, TextInput } from "@mantine/core";
import { TimePicker } from "@mantine/dates";
import { Controller, useForm } from "react-hook-form";
import { restaurantSchema, type RestaurantFormData } from "../../model/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Clock } from "lucide-react";
import type { ReactNode } from "react";

interface UpdateRestaurantFormProps {
  onFormSubmit: (values: RestaurantFormData) => void;
  children: ReactNode;
  errorMessage: string;
  defaultData: Partial<RestaurantFormData>;
}

export const UpdateRestaurantForm = ({
  onFormSubmit,
  children,
  errorMessage,
  defaultData,
}: UpdateRestaurantFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RestaurantFormData>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      name: defaultData.name,
      address: defaultData.address,
      phone: defaultData.phone,
      start_time: defaultData.start_time,
      end_time: defaultData.end_time,
    },
  });

  return (
    <form onSubmit={handleSubmit((values) => onFormSubmit(values))}>
      <Stack>
        <Stack px={24}>
          <TextInput
            placeholder="Введите название"
            label="Название"
            size="sm"
            {...register("name")}
            error={errors.name?.message}
          />
          <TextInput
            placeholder="Город, улица, дом"
            label="Адрес"
            size="sm"
            {...register("address")}
            error={errors.address?.message}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <PhoneInput
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={errors.phone?.message}
              />
            )}
          />

          <Group>
            <Controller
              name="start_time"
              control={control}
              render={({ field }) => (
                <TimePicker
                  flex={1}
                  label="Открывается"
                  format="24h"
                  rightSection={<Clock size={16} />}
                  {...field}
                  error={errors.start_time?.message}
                />
              )}
            />

            <Controller
              name="end_time"
              control={control}
              render={({ field }) => (
                <TimePicker
                  flex={1}
                  label="Закрывается"
                  format="24h"
                  rightSection={<Clock size={16} />}
                  {...field}
                  error={errors.end_time?.message}
                />
              )}
            />
          </Group>

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
