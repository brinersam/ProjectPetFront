import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  FormControl,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
  type SxProps,
  type Theme,
} from "@mui/material";
import {
  type FieldErrors,
  type FieldValues,
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

type ArrayFieldInputBoxProps<TFields extends FieldValues> = {
  getFieldName: (index: number) => string;
  label?: string;
  disabled?: boolean;
  type?: React.HTMLInputTypeAttribute;
  form: FormFuncs<TFields>;
  required?: boolean;
  hider?: HiderProps;
  validation?: (value: string) => string | undefined;
  style?: StyleProps;
  index: number;
  sx?: SxProps<Theme>;
};

export default function ArrayFieldInputBox<TFields extends FieldValues>({
  getFieldName,
  label,
  disabled,
  type = "text",
  form,
  required,
  hider,
  validation,
  style,
  index,
  sx,
}: ArrayFieldInputBoxProps<TFields>) {
  const fieldPath = getFieldName(index);
  const elevation = style?.elevation
    ? style?.elevation * ((index % 2) * 2)
    : undefined;

  return (
    <Paper
      square={false}
      elevation={elevation ?? 0}
      sx={{
        padding: "1%",
        display: "flex",
        alignItems: "center",
        width: "100%",
        ...sx,
      }}
    >
      <FormControl sx={{ width: "100%" }} variant="filled" size="small">
        <TextField
          disabled={disabled}
          placeholder={label ?? fieldPath}
          required={required}
          id={fieldPath}
          type={
            hider?.hiderBool === undefined
              ? type
              : hider?.hiderBool
              ? type
              : "password"
          }
          {...form.register(
            fieldPath as any,
            validation ? { validate: validation } : undefined
          )}
          error={!!form.errors?.[fieldPath]}
          helperText={formErrorHtml(getError(form.errors, fieldPath))}
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

function getError(errors: FieldErrors, path: string): string | undefined {
  if (!errors) return undefined;
  const objectProps = path.split(".");
  let current: any = errors;

  for (const prop of objectProps) {
    // drilling deeper into the object using path
    /*
        part = "certifications" → current = current["certifications"] → array
        part = "1" → current = current["1"] → second item (index 1)
        part = "value" → current = current["value"] → { message: "..." }
    */
    if (!current) return undefined;
    current = current[prop];
  }
  return current?.message;
}

function formErrorHtml(error: any | string | undefined): ReactNode {
  return !!error ? (
    <Typography variant="caption" color="error">
      {error}
    </Typography>
  ) : null;
}
