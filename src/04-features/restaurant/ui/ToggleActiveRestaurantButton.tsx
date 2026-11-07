import { useUpdateRestaurant } from "@/05-entities/restaurant";
import { Button, Stack, Text } from "@mantine/core";
import { Pause, Play } from "lucide-react";
import { toast } from "react-toastify";

interface ToggleActiveRestaurantButtonProps {
  restaurantId: number;
  restaurantName: string;
  isActive: boolean;
}

const buttonLook = {
  false: {
    label: "Активировать",
    icon: Play,
    color: "teal",
    hint: "Неактивный ресторан не доступен для бронирования",
  },
  true: {
    label: "Деактивировать",
    icon: Pause,
    color: "red.8",
    hint: undefined,
  },
};

export const ToggleActiveRestaurantButton = ({
  restaurantId,
  restaurantName,
  isActive,
}: ToggleActiveRestaurantButtonProps) => {
  const { mutate, isPending } = useUpdateRestaurant();

  const CurrentButton = buttonLook[isActive ? "true" : "false"];

  return (
    <>
      <Stack gap={5}>
        <Button
          leftSection={<CurrentButton.icon size={14} />}
          variant="outline"
          c={CurrentButton.color}
          color={CurrentButton.color}
          size="xs"
          loading={isPending}
          onClick={() => {
            mutate({ id: restaurantId, data: { is_active: !isActive }}, {
              onSuccess: () => {
                toast.success(`«${restaurantName}» ${isActive ? "деактивирован" : "снова активен"}`);
              }
            });
          }}
        >
          <Text size="xs" fw={600}>
            {CurrentButton.label}
          </Text>
        </Button>
        {CurrentButton.hint && (
          <Text ta={"center"} size={"xs"} c={"gray"}>
            {CurrentButton.hint}
          </Text>
        )}
      </Stack>
    </>
  );
};
