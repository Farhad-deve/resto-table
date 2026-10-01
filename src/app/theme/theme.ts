import { createTheme } from "@mantine/core";

export const theme = createTheme({
    primaryColor: "teal",
    fontFamily: "Onest, sans-serif",
    headings: {
        fontWeight: "600",
        sizes: {
            h1: { fontSize: "1.375rem" },
            h2: { fontSize: "1.125rem" },
            h3: { fontSize: "1rem" }
        }
    },
})