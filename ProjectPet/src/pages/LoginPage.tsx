import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { PATHS } from "../app/Paths";
import { useForm } from "react-hook-form";
import TitleLabel from "../components/RegistrationLogin/TitleLabel";
import BasicButton from "../components/RegistrationLogin/BasicButton";
import BackToMainBtn from "../components/RegistrationLogin/BackToMainBtn";
import FormTextBox from "../components/Form/FormTextBox";
import { authSelectors } from "../api/Auth/AuthSlice";
import { useAppDispatch, useAppSelector } from "../reduxTypes";
import { loginThunk } from "../api/Auth/Thunks/loginThunk";

export default function LoginPage() {
  const authIsLoading =
    useAppSelector(authSelectors.selectLoginStatus) == "loading";

  const dispatch = useAppDispatch();

  const OnSubmit = async (data: FormFields) => {
    dispatch(loginThunk(data));
  };

  //#region Form
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormFields>({ mode: "onChange" });

  type FormFields = { email: string; password: string };

  const validateEmailField = (value: string) => {
    if (!value.includes("@") && value) return 'Email is invalid - missing "@"';
  };
  //#endregion

  const loginButton = authIsLoading ? (
    <CircularProgress color="secondary" />
  ) : (
    <BasicButton label="LogIn" />
  );

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
          <TitleLabel label="Login" />
          <Button
            sx={{ backgroundColor: "#59993c" }}
            onClick={() => {
              setValue("email", "DEFAULTADMINUSERNAME@mail.com");
              setValue("password", "Aa1#1234567890-123456");
            }}
          ></Button>
          <FormTextBox<FormFields>
            disabled={authIsLoading}
            field="email"
            label="Email"
            style={{ elevation: 1 }}
            validation={validateEmailField}
            form={{ errors: errors, register: register }}
          />
          <FormTextBox<FormFields>
            disabled={authIsLoading}
            field="password"
            label="Password"
            style={{ elevation: 1 }}
            form={{ errors: errors, register: register }}
            hider={{
              hiderBool: showPassword,
              hiderOnClick: () => setShowPassword(!showPassword),
            }}
          />
          <Grid
            size={12}
            sx={{ display: "flex", justifyContent: "center", mt: 2 }}
          >
            <RegistrationSuggestionHtml />
          </Grid>
          <Grid
            size={12}
            sx={{ display: "flex", justifyContent: "center", mt: 2 }}
          >
            {loginButton}
          </Grid>
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
        sx={{ textAlign: "center", textDecoration: "underline" }}
        display="inline"
        variant="caption"
        color="secondary"
      >
        <NavLink to={PATHS.Registration}>Create one.</NavLink>
      </Typography>
    </Grid>
  );
}
