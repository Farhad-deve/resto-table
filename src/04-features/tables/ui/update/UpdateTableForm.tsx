import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, Group, Stack, Text, TextInput } from "@mantine/core";
import { AlertCircle } from "lucide-react";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { tableSchema, type TableFormData } from "../../model/schemas";

interface UpdateTableFormProps {
  children: ReactNode;
  errorMessage: string;
  onFormSubmit: (values: TableFormData) => void;
  defaultData: Partial<TableFormData>;
}

export const UpdateTableForm = ({
  children,
  defaultData,
  errorMessage,
  onFormSubmit,
}: UpdateTableFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TableFormData>({
    resolver: zodResolver(tableSchema),
    defaultValues: {
      number: defaultData.number,
      seats: defaultData.seats,
    },
  });

  return (
    <form onSubmit={handleSubmit((values) => onFormSubmit(values))}>
      <Stack>
        <Stack px={24}>
          <Group>
            <TextInput
              inputMode="numeric"
              placeholder="авто"
              label="Номер"
              {...register("number")}
              error={errors.number?.message}
              maw={180}
            />
            <TextInput
              inputMode="numeric"
              placeholder="4"
              label="Мест"
              {...register("seats", { valueAsNumber: true })}
              error={errors.seats?.message}
              maw={180}
            />
          </Group>
          <Text c="gray" size="xs">
            Если номер не указан, будет выбран следующий свободный.
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
      </Stack>
    </form>
  );
};
