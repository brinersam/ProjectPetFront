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

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  type FormField = "email" | "password";
  type FormState = Record<FormField, string>;
  const [formData, setFormData] = useState<FormState>({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<FormState>({
    email: "",
    password: "",
  });
  const doesFormHaveErrors = Object.entries(formErrors).some(([key, value]) => {
    return value;
  });

  const handleFormChange = (key: FormField, value: string) => {
    if (key == "email") {
      setFormData((x) => ({ ...x, email: value }));

      if (!value.includes("@") && value) {
        setFormErrors((x) => ({ ...x, email: "Email is invalid" }));
      } else {
        setFormErrors((x) => ({ ...x, email: "" }));
      }

      return;
    }

    if (key == "password") {
      setFormData((x) => ({ ...x, password: value }));
    }
  };

  const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (doesFormHaveErrors) return;

    console.log("Form submitted:", formData);
  };

  function formErrorHtml(key: FormField): ReactNode {
    if (formErrors[key])
      return (
        <Typography variant="caption" color="error">
          {formErrors[key]}
        </Typography>
      );
    return <></>;
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
            onSubmit={HandleSubmit}
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
          disabled={doesFormHaveErrors}
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
            onChange={(event) => handleFormChange("email", event.target.value)}
            id={label}
            type="text"
            helperText={formErrorHtml("email")}
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
            onChange={(event) =>
              handleFormChange("password", event.target.value)
            }
            required
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
