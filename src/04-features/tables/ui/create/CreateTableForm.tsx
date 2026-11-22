import { Alert, Group, Stack, Text, TextInput } from "@mantine/core";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { tableSchema, type TableFormData } from "../../model/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";

interface CreateTableFormProps {
  onFormSubmit: (values: TableFormData) => void;
  children: ReactNode;
  errorMessage: string;
}

export const CreateTableForm = ({
  onFormSubmit,
  children,
  errorMessage,
}: CreateTableFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TableFormData>({
    resolver: zodResolver(tableSchema),
    defaultValues: {
      number: "",
      seats: 4,
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
