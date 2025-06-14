import {
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
import { NavLink, useNavigate } from "react-router-dom";
import { PATHS } from "../app/Paths";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext/AuthContext";
import TitleLabel from "../components/RegistrationLogin/TitleLabel";
import BasicButton from "../components/RegistrationLogin/BasicButton";
import BackToMainBtn from "../components/RegistrationLogin/BackToMainBtn";
import ExceptionsHelper from "../app/Helpers/ExceptionsHelper";
import TextBoxHtml from "../components/RegistrationLogin/FormTextBox";

export default function LoginPage() {
  //#region Form
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ mode: "onChange" });

  type FormFields = { email: string; password: string };

  const validateEmailField = (value: string) => {
    if (!value.includes("@") && value) return 'Email is invalid - missing "@"';
  };

  const { login, accessToken } = useAuth();
  const navigate = useNavigate();

  const OnSubmit = async (data: FormFields) => {
    try {
      await login(data.email, data.password);
      navigate(PATHS.Profile);
    } catch (exception) {
      ExceptionsHelper.ToastError(exception);
    }
  };
  //#endregion

  return <>{RenderHtml()}</>;

  function RenderHtml() {
    return (
      <>
        <BackToMainBtn />
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
            <div>{accessToken}</div>

            <TitleLabel label="Login" />
            <TextBoxHtml<FormFields>
              field="email"
              label="Email"
              style={{ elevation: 1 }}
              validation={validateEmailField}
              form={{ errors: errors, register: register }}
            />
            <TextBoxHtml<FormFields>
              field="password"
              label="Password"
              style={{ elevation: 1 }}
              form={{ errors: errors, register: register }}
              hider={{
                hiderBool: showPassword,
                hiderOnClick: () => setShowPassword(!showPassword),
              }}
            />
            <Grid size={12} sx={{ justifyContent: "center" }}>
              <BasicButton label="LogIn" />
            </Grid>
            <RegistrationSuggestionHtml />
          </Grid>
        </Paper>
      </>
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
}
