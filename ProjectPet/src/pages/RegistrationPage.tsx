import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState, type ReactNode } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { NavLink, useNavigate } from "react-router-dom";
import { PATHS } from "../app/Paths";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import type { Envelope } from "../models/responses";
import AuthService from "../api/Services/AuthService";

export default function RegistrationPage(): ReactNode {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const {
    register,
    watch,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormFields>({ mode: "onChange" });

  type FormFields = {
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  };

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

  const navigate = useNavigate();

  const OnSubmit = async (data: FormFields) => {
    try {
      await AuthService.Register(data.username, data.email, data.password);
      navigate(PATHS.Index);
      toast("Success!");
    } catch (RawException) {
      let Exception = RawException as AxiosError<Envelope<any>>;
      let errorMessage: string | AxiosError | undefined =
        Exception.response?.data?.errors[0]?.message;

      if (errorMessage === undefined) errorMessage = Exception;

      toast("Error:" + errorMessage);
    }
  };

  const [tab, setTab] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newTab: number) => {
    setTab(newTab);
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
            marginTop: "5%",
            marginBottom: "5%",
            width: "30%",
            maxHeight: "60rem",
          }}
        >
          <TitleHtml />
          <Tabs value={tab} onChange={handleChange} centered>
            <Tab label="Register as user" />
            <Tab label="Register as volunteer" />
          </Tabs>
          {tab == 0 ? UserRegistrationHtml() : <></>}
        </Paper>
      </>
    );
  }

  function UserRegistrationHtml() {
    return (
      <Grid
        component="form"
        onSubmit={handleSubmit(OnSubmit)}
        container
        sx={{ justifyContent: "center" }}
      >
        {TextBoxHtml({
          key: "username",
          label: "UserName",
          elevation: 1,
        })}
        {TextBoxHtml({
          key: "email",
          label: "Email",
          elevation: 1,
          validation: validateEmailField,
        })}
        {TextBoxHtml({
          key: "password",
          label: "Password",
          elevation: 1,
          hiderBool: showPassword,
          hiderOnclick: () => setShowPassword(!showPassword),
        })}
        {TextBoxHtml({
          key: "passwordConfirmation",
          label: "Confirm password",
          elevation: 1,
          validation: validatePasswordConfirmation,
          hiderBool: showPasswordConfirmation,
          hiderOnclick: () =>
            setShowPasswordConfirmation(!showPasswordConfirmation),
        })}
        <Grid size={12} sx={{ justifyContent: "center" }}>
          <ButtonHtml label="Register" />
        </Grid>
        <RegistrationSuggestionHtml />
      </Grid>
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

  function TitleHtml() {
    return (
      <Typography
        variant="h4"
        sx={{
          marginLeft: "auto",
          marginRight: "auto",
          width: "33%",
          marginBottom: "2rem",
          display: { md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          color: "inherit",
        }}
      >
        Register
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

  function TextBoxHtml({
    key,
    label = undefined,
    hiderOnclick = undefined,
    hiderBool = undefined,
    validation = undefined,
    elevation = 0,
  }: {
    key: "username" | "email" | "password" | "passwordConfirmation";
    label?: string | undefined;
    hiderOnclick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    hiderBool?: boolean | undefined;
    validation?: undefined | ((value: string) => string | undefined);
    elevation?: number;
  }) {
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
            placeholder={label ?? key}
            required
            id={key}
            type={
              hiderBool === undefined ? "text" : hiderBool ? "text" : "password"
            }
            {...register(
              key,
              validation ? { validate: validation } : undefined
            )}
            error={!!errors[key]}
            helperText={formErrorHtml(errors[key]?.message)}
            slotProps={
              hiderBool !== undefined && hiderOnclick !== undefined
                ? {
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label={
                              hiderBool
                                ? "hide the password"
                                : "display the password"
                            }
                            onClick={hiderOnclick}
                          >
                            {hiderBool ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }
                : undefined
            }
          />
        </FormControl>
      </Paper>
    );
  }
}
