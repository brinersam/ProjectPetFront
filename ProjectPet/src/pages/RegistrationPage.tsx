import { Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState, type ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { PATHS } from "../app/Paths";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import BackToMainBtn from "../components/RegistrationLogin/BackToMainBtn";
import BasicButton from "../components/RegistrationLogin/BasicButton";
import TitleLabel from "../components/RegistrationLogin/TitleLabel";
import ExceptionsHelper from "../app/Helpers/ExceptionsHelper";
import FormTextBox from "../components/Form/FormTextBox";
import { useRegisterMutation } from "../api/Auth/AuthApi";

export default function RegistrationPage(): ReactNode {
  const navigate = useNavigate();
  //#region Auth

  const [register, { error: registerError, isError: isRegisterError }] =
    useRegisterMutation();

  const onSubmit = async (data: FormFields) => {
    try {
      await register({
        email: data.email,
        password: data.password,
        username: data.username,
      });

      if (isRegisterError) {
        ExceptionsHelper.ToastError(registerError);
        return;
      }

      navigate(PATHS.Login);
      toast("Success!");
    } catch (exception) {
      ExceptionsHelper.ToastError(exception);
    }
  };

  //#endregion

  //#region Form
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  type FormFields = {
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  };

  const {
    register: registerForm,
    watch,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormFields>({ mode: "onChange" });

  const passwordValue = watch("password");
  useEffect(() => {
    // sync passwords
    trigger("passwordConfirmation");
  }, [passwordValue]);

  const validateEmailField = (value: string) => {
    if (!value.includes("@") && value) return 'Email is invalid - missing "@"';
  };

  const validatePasswordConfirmation = (value: string) => {
    if (value.localeCompare(passwordValue) != 0)
      return "Passwords should match";
  };

  //#endregion

  //#region Tab
  const [tab, setTab] = useState(0);
  const handleTabChange = (_event: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
  };
  //#endregion

  return (
    <>
      <BackToMainBtn />
      <Paper
        elevation={4}
        sx={{
          padding: "2rem",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "5%",
          marginBottom: "5%",
          width: "30%",
          maxHeight: "60rem",
        }}
      >
        <TitleLabel label="Registration" />
        <Tabs value={tab} onChange={handleTabChange} centered>
          <Tab label="Register as user" />
          <Tab label="Register as volunteer" />
        </Tabs>
        {tab == 0 ? UserRegistrationHtml() : <></>}
      </Paper>
    </>
  );

  function UserRegistrationHtml() {
    return (
      <Grid
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        container
        sx={{ justifyContent: "center" }}
      >
        <FormTextBox<FormFields>
          field="username"
          label="Username"
          style={{ elevation: 1 }}
          form={{ errors: errors, register: registerForm }}
        />

        <FormTextBox<FormFields>
          field="email"
          label="Email"
          style={{ elevation: 1 }}
          validation={validateEmailField}
          form={{ errors: errors, register: registerForm }}
        />

        <FormTextBox<FormFields>
          field="password"
          label="Password"
          style={{ elevation: 1 }}
          form={{ errors: errors, register: registerForm }}
          hider={{
            hiderBool: showPassword,
            hiderOnClick: () => setShowPassword(!showPassword),
          }}
        />

        <FormTextBox<FormFields>
          field="passwordConfirmation"
          label="Confirm password"
          style={{ elevation: 1 }}
          form={{ errors: errors, register: registerForm }}
          validation={validatePasswordConfirmation}
          hider={{
            hiderBool: showPasswordConfirmation,
            hiderOnClick: () =>
              setShowPasswordConfirmation(!showPasswordConfirmation),
          }}
        />
        <Grid size={12} sx={{ justifyContent: "center" }}>
          <BasicButton label="Register" />
        </Grid>
        <RegistrationSuggestionHtml />
      </Grid>
    );
  }

  function RegistrationSuggestionHtml() {
    return (
      <Grid container columnSpacing={1}>
        <Typography variant="caption">Already have an account?</Typography>
        <Typography
          sx={{ textDecoration: "underline" }}
          display="inline"
          variant="caption"
          color="secondary"
        >
          <NavLink to={PATHS.Login}>Sign in.</NavLink>
        </Typography>
      </Grid>
    );
  }
}
