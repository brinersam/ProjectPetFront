import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState, type ReactNode } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { NavLink } from "react-router-dom";
import { PATHS } from "../app/Paths";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  type FormFields = { email: string; password: string };

  const validateEmailField = (value: string) => {
    if (!value.includes("@") && value) return 'Email is invalid - missing "@"';
  };

  const OnSubmit = (data: FormFields) => {
    console.log("Form submitted:", data);
  };

  function formErrorHtml(error: string | undefined): ReactNode {
    return !!error ? (
      <Typography variant="caption" color="error">
        {error}
      </Typography>
    ) : (
      <></>
    );
  }

  return <>{RenderHtml()}</>;

  function RenderHtml() {
    return (
      <>
        <BackToMainBtnHtml />
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
          <Grid
            component="form"
            onSubmit={handleSubmit(OnSubmit)}
            container
            sx={{ justifyContent: "center" }}
          >
            <TitleHtml />
            {EmailBoxHtml("Email,", 1)}
            {PasswordBoxHtml(1)}
            <Grid size={12} sx={{ justifyContent: "center" }}>
              <ButtonHtml label="LogIn" />
            </Grid>
            <RegistrationSuggestionHtml />
          </Grid>
        </Paper>
      </>
    );
  }

  function BackToMainBtnHtml() {
    return (
      <Paper sx={{ width: "40%" }}>
        <NavLink to={PATHS.Index}>
          <ButtonHtml
            label={
              <>
                <ArrowBackIosIcon />
                Back to Main
              </>
            }
            elevation={3}
          />
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

  function ButtonHtml({
    label,
    elevation = 0,
  }: {
    label: string | ReactNode;
    elevation?: number;
  }) {
    return (
      <Paper
        sx={{
          margin: "1rem",
          width: "100%",
        }}
        elevation={elevation}
      >
        <Button
          type="submit"
          sx={{
            width: "100%",
          }}
        >
          {label}
        </Button>
      </Paper>
    );
  }

  function EmailBoxHtml(label: string, elevation: number = 0) {
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
          <TextField
            placeholder="Email"
            required
            id={label}
            type="text"
            {...register("email", {
              validate: validateEmailField,
            })}
            error={!!errors.email}
            helperText={formErrorHtml(errors.email?.message)}
          />
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
          <TextField
            required
            {...register("password")}
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        </FormControl>
      </Paper>
    );
  }
}
