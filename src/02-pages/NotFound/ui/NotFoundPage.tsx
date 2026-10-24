import { Button, Group, Text, Title } from "@mantine/core";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex justify-center items-center gap-3 flex-col text-center">
      <img
        src="/not-found-icon.svg"
        alt="Not Found Icon"
        className="w-40"
      />
      <Title>Страница не найдена</Title>
      <Text maw={400} c={"gray.6"} size="sm">
        Кажется, вы перешли на неправильной ссылке или страница была удалена.
      </Text>
      <Button onClick={() => navigate("/")}>
        <Group gap={10}>
          <ArrowLeft size={16} />
          <span>На главную</span>
        </Group>
      </Button>
    </div>
  );
};
