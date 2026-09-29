import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { theme } from "../theme";
import { store } from "../store";
import { RouterProvider } from "react-router";
import { router } from "../routes";

export const queryClient = new QueryClient();

export const AppProviders = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <MantineProvider theme={theme}>
          <RouterProvider router={router} />
        </MantineProvider>
      </Provider>
    </QueryClientProvider>
  );
};
