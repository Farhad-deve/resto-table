import { Button, Text, Title } from "@mantine/core";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

export const NoAccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen flex justify-center items-center gap-3 flex-col text-center">
      <img src="/no-access-icon.svg" alt="Not Access Icon" className="w-40" />
      <Title>Нет доступа</Title>
      <Text maw={400} c={"gray.6"} size="sm">
        У вас нет прав для просмотра этой страницы.
        Если вы считаете, что это ошибка, обратитесь к администратору.
      </Text>
      <Button onClick={() => navigate(-1)}>
        <ArrowLeft />
        <span>Назад</span>
      </Button>
    </div>
  );
};
