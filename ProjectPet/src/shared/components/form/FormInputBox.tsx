import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  FormControl,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import {
  type FieldErrors,
  type FieldValues,
  type Path,
  type UseFormRegister,
} from "react-hook-form";
import type { ReactNode } from "react";

type FormFuncs<TFields extends FieldValues> = {
  register: UseFormRegister<TFields>;
  errors: FieldErrors<TFields>;
};

type HiderProps = {
  hiderOnClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  hiderBool: boolean | undefined;
};

type StyleProps = {
  elevation?: number;
};

type Props<TFields extends FieldValues> = {
  field: Path<TFields>;
  label?: string | undefined;
  disabled?: boolean;
  type?: React.HTMLInputTypeAttribute;
  form: FormFuncs<TFields>;
  required?: boolean;
  hider?: HiderProps;
  validation?: undefined | ((value: string) => string | undefined);
  style?: StyleProps;
};

export default function FormInputBox<TFields extends FieldValues>({
  field,
  label = undefined,
  disabled = undefined,
  type = "text",
  form,
  required = undefined,
  hider = undefined,
  validation = undefined,
  style = undefined,
}: Props<TFields>) {
  return (
    <Paper
      square={false}
      elevation={style?.elevation ?? 0}
      sx={{
        padding: 1 + "%",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <FormControl sx={{ width: "100%" }} variant="filled" size="small">
        <TextField
          disabled={disabled}
          placeholder={label ?? field}
          required={required}
          id={field}
          type={
            hider?.hiderBool === undefined
              ? type
              : hider?.hiderBool
              ? type
              : "password"
          }
          {...form?.register(
            field,
            validation ? { validate: validation } : undefined
          )}
          error={!!form.errors[field]}
          helperText={formErrorHtml(form.errors[field]?.message)}
          slotProps={
            hider?.hiderBool !== undefined && hider?.hiderOnClick !== undefined
              ? {
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          disabled={disabled}
                          aria-label={
                            hider?.hiderBool
                              ? "hide the password"
                              : "display the password"
                          }
                          onClick={hider?.hiderOnClick}
                        >
                          {hider?.hiderBool ? (
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

function formErrorHtml(error: any | string | undefined): ReactNode {
  return !!error ? (
    <Typography variant="caption" color="error">
      {error}
    </Typography>
  ) : (
    <></>
  );
}
