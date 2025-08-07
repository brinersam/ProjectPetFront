import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useRegisterMutation } from "../../../modules/Auth/AuthApi";
import BasicButton from "../../../modules/Auth/components/registrationLogin/BasicButton";
import FormInputBox from "../../../shared/components/form/FormInputBox";
import ExceptionsHelper from "../../../shared/helpers/exceptionsHelper";
import { PATHS } from "../../../shared/paths";

export default function UserRegistration({
  disabled = false,
}: {
  disabled?: boolean;
}) {
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

  //#endregion Auth

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
  //#endregion Form

  return (
    <Grid
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      container
      sx={{ justifyContent: "center" }}
    >
      <FormInputBox<FormFields>
        disabled={disabled}
        field="username"
        label="Username"
        required={true}
        style={{ elevation: 1 }}
        form={{ errors: errors, register: registerForm }}
      />

      <FormInputBox<FormFields>
        disabled={disabled}
        field="email"
        label="Email"
        required={true}
        style={{ elevation: 1 }}
        validation={validateEmailField}
        form={{ errors: errors, register: registerForm }}
      />

      <FormInputBox<FormFields>
        disabled={disabled}
        field="password"
        label="Password"
        required={true}
        style={{ elevation: 1 }}
        form={{ errors: errors, register: registerForm }}
        hider={{
          hiderBool: showPassword,
          hiderOnClick: () => setShowPassword(!showPassword),
        }}
      />

      <FormInputBox<FormFields>
        disabled={disabled}
        field="passwordConfirmation"
        label="Confirm password"
        required={true}
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
        <BasicButton disabled={disabled} label="Register" />
      </Grid>
      {RegistrationSuggestionHtml(disabled)}
    </Grid>
  );
}

function RegistrationSuggestionHtml(disabled: boolean) {
  return (
    <>
      {disabled ? (
        <></>
      ) : (
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
      )}
    </>
  );
}
