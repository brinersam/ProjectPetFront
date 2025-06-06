import {
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { useState, type ReactNode } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { NavLink } from "react-router";
import { PATHS } from "../app/Paths";

export default function LoginPage(): ReactNode {
  const [showPassword, setShowPassword] = useState(false);
  return <>{RenderHtml()}</>;

  function RenderHtml(): ReactNode {
    return (
      <>
        {BackToMainBtnHtml()}
        <Paper
          elevation={4}
          sx={{
            padding: "2rem",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "10%",
            width: "30%",
            maxHeight: "60rem",
          }}
        >
          <Grid container sx={{ justifyContent: "center" }}>
            {TitleHtml()}
            {TextBoxHmtl("Email", 1)}
            {PasswordBoxHtml(1)}
            <Grid sx={{ width: "70%" }}>{ButtonHtml("LogIn")}</Grid>
            {RegistrationSuggestionHtml()}
          </Grid>
        </Paper>
      </>
    );

    function BackToMainBtnHtml() {
      return (
        <Paper sx={{ width: "40%" }}>
          <NavLink to={PATHS.Index}>
            {ButtonHtml(
              <>
                <ArrowBackIosIcon />
                Back to Main
              </>,
              3
            )}
          </NavLink>
        </Paper>
      );
    }

    function RegistrationSuggestionHtml() {
      return (
        <Grid container columnSpacing={1}>
          <Typography variant="caption">Dont have an account?</Typography>
          <Typography
            sx={{ textDecoration: "underline" }}
            display="inline"
            variant="caption"
            color="secondary"
          >
            <NavLink to={PATHS.Registration}>Create one.</NavLink>
          </Typography>
        </Grid>
      );
    }

    function TitleHtml() {
      return (
        <Typography
          variant="h4"
          sx={{
            marginBottom: "2rem",
            display: { md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            color: "inherit",
          }}
        >
          Login
        </Typography>
      );
    }

    function ButtonHtml(label: string | ReactNode, elevation: number = 0) {
      return (
        <Paper
          sx={{
            margin: "1rem",
            width: "100%",
          }}
          elevation={elevation}
        >
          <Button
            sx={{
              width: "100%",
            }}
          >
            {label}
          </Button>
        </Paper>
      );
    }

    function TextBoxHmtl(label: string, elevation: number = 0) {
      return (
        <Paper
          square={false}
          elevation={elevation}
          sx={{
            padding: 1 + "%",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <FormControl
            sx={{
              width: "100%",
            }}
            variant="filled"
            size="small"
          >
            <InputLabel htmlFor={label}>{label}</InputLabel>
            <Input id={label} type="text" />
          </FormControl>
        </Paper>
      );
    }

    function PasswordBoxHtml(elevation: number = 0) {
      return (
        <Paper
          square={false}
          elevation={elevation}
          sx={{
            padding: 1 + "%",
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <FormControl
            sx={{
              width: "100%",
            }}
            variant="filled"
            size="small"
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Paper>
      );
    }
  }
}
