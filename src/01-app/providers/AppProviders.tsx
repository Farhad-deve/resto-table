import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { theme } from "../theme";
import { store } from "../store";
import { RouterProvider } from "react-router";
import { router } from "../routes";
import { logout } from "@/05-entities/user";
import { setSessionExpiredHandler } from "@/06-shared/api";

export const queryClient = new QueryClient();

setSessionExpiredHandler((() => {
  store.dispatch(logout());
  queryClient.clear();
}));

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
