import { createTheme } from "@mui/material";

export const darkTheme = createTheme(
    {
        palette: {
            mode: "dark",
            primary: {
                light: "#b093f5",
                main: "#628d62",
                dark: "#3b33a5",
                contrastText: "#ffffff"
            }
        }
    }

);