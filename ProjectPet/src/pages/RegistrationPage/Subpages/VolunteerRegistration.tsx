import { Grid, IconButton, Paper, Typography } from "@mui/material";
import { useFieldArray, useForm } from "react-hook-form";
import BasicButton from "../../../modules/Auth/components/registrationLogin/BasicButton";
import FormInputBox from "../../../shared/components/form/FormInputBox";
import { useNewVolunteerRequestMutation } from "../../../modules/VolunteerRequests/volunteerRequestApi";
import type { PaymentInfo } from "../../../modules/VolunteerRequests/Models/paymentInfo";
import ExceptionsHelper from "../../../shared/helpers/exceptionsHelper";
import { toast } from "react-toastify";
import ArrayFieldInputBox from "../../../shared/components/form/ArrayFieldInputBox";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import React from "react";

export default function VolunteerRegistration({
  disabled = false,
}: {
  disabled?: boolean;
}) {
  //#region MutateState
  const [register, { error: registerError, isError: isRegisterError }] =
    useNewVolunteerRequestMutation();

  const onSubmit = async (data: FormFields) => {
    try {
      const result = await register({
        accountDto: {
          experience: data.experience!,
          certifications: data.certifications
            .filter((x) => x.value != undefined)
            .map((x) => x.value!),
          paymentInfos: data.paymentInfos,
        },
      });
      if (result.error || isRegisterError) {
        ExceptionsHelper.ToastError(result.error ?? registerError);
        return;
      }
      toast("Success!");
    } catch (exception) {
      ExceptionsHelper.ToastError(exception);
    }
  };

  //#endregion MutateState

  //#region Form

  //#region Types
  type FormFields = {
    name?: string;
    surname?: string;
    middlename?: string;
    aboutSelf?: string;
    experience?: number;
    certifications: Certification[];
    paymentInfos: PaymentInfo[];
  };

  type Certification = {
    value?: string;
  };
  //#endregion Types

  //#region Form defs
  const defaultFormValues: FormFields = {
    certifications: [{}],
    paymentInfos: [{}],
  };

  const {
    register: registerForm,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    mode: "onChange",
    defaultValues: { ...defaultFormValues },
  });

  const {
    fields: certFields,
    append: certAppend,
    remove: certRemove,
  } = useFieldArray({
    control,
    name: "certifications",
  });

  const {
    fields: payFields,
    append: payAppend,
    remove: payRemove,
  } = useFieldArray({
    control,
    name: "paymentInfos",
  });
  //#endregion Form defs

  //#region Validation
  const validateMoreThan1CharOptional = (value: string) => {
    if (value) return validateMoreThan1Char(value);
  };

  const validateMoreThan1Char = (value: string) => {
    if (value && !/\S/.test(value))
      //string is not empty and not just whitespace
      return "Введите больше символов";
  };

  const validateMoreThan10Char = (value: string) => {
    const nonWhitespaceStr = value.replace(/\s/g, "");
    if (nonWhitespaceStr.length < 10) return "Введите больше символов";
  };
  //#endregion Validation

  return (
    <Grid
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      container
      sx={{ justifyContent: "center" }}
    >
      <FormInputBox<FormFields>
        field="name"
        label="Имя"
        required={true}
        disabled={disabled}
        style={{ elevation: 1 }}
        validation={validateMoreThan1Char}
        form={{ errors, register: registerForm }}
      />
      <FormInputBox<FormFields>
        field="surname"
        label="Фамилия"
        required={true}
        disabled={disabled}
        style={{ elevation: 1 }}
        validation={validateMoreThan1Char}
        form={{ errors, register: registerForm }}
      />
      <FormInputBox<FormFields>
        field="middlename"
        label="Отчество"
        required={false}
        disabled={disabled}
        style={{ elevation: 1 }}
        validation={validateMoreThan1CharOptional}
        form={{ errors, register: registerForm }}
      />
      <FormInputBox<FormFields>
        field="aboutSelf"
        label="О себе"
        required={true}
        disabled={disabled}
        style={{ elevation: 1 }}
        validation={validateMoreThan10Char}
        form={{ errors, register: registerForm }}
      />
      <FormInputBox<FormFields>
        field="experience"
        label="Лет опыта"
        type="number"
        required={true}
        disabled={disabled}
        style={{ elevation: 1 }}
        form={{ errors, register: registerForm }}
      />
      {AddRemove("Квалификации", certAppend, certRemove, disabled)}
      {certFields.map((field, idx) => (
        <ArrayFieldInputBox<FormFields>
          key={field.id}
          index={idx}
          sx={{ width: "95%", marginLeft: "auto" }}
          style={{ elevation: 3 }}
          getFieldName={(idx) => `certifications.${idx}.value` as const}
          disabled={disabled}
          form={{ register: registerForm, errors }}
          label={`Certification #${idx + 1}`}
        />
      ))}
      {AddRemove("Данные для оплаты", payAppend, payRemove, disabled)}
      {payFields.map((field, idx) => (
        <React.Fragment key={field.id}>
          <ArrayFieldInputBox<FormFields>
            key={field.id + "Title"}
            index={idx}
            sx={{ width: "95%", marginLeft: "auto" }}
            style={{ elevation: 2 }}
            getFieldName={(idx) => `paymentInfos.${idx}.title` as const}
            disabled={disabled}
            form={{ register: registerForm, errors }}
            label={`PaymentInfos.Title #${idx + 1}`}
          />
          <ArrayFieldInputBox<FormFields>
            key={field.id + "Instructions"}
            index={idx}
            sx={{ width: "95%", marginLeft: "auto" }}
            style={{ elevation: 3 }}
            getFieldName={(i) => `paymentInfos.${i}.instructions` as const}
            disabled={disabled}
            form={{ register: registerForm, errors }}
            label={`PaymentInfos.Instructions #${idx + 1}`}
          />
        </React.Fragment>
      ))}
      <Grid size={12} sx={{ justifyContent: "center" }}>
        <BasicButton disabled={disabled} label="Register" />
      </Grid>
    </Grid>
  );

  function AddRemove(
    label: string,
    addFun: any,
    removeFun: any,
    disabled: boolean
  ) {
    return (
      <Paper
        sx={{
          width: "100%",
        }}
      >
        <Paper
          elevation={6}
          sx={{
            padding: "1%",
            display: "flex",
            alignItems: "center",
            marginRight: "auto",
            width: "100%",
            justifyContent: "space-evenly",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "inherit",
            }}
          >
            {label}
          </Typography>
          <Paper sx={{ width: "40", marginLeft: "auto" }}>
            <IconButton
              disabled={disabled}
              onClick={() => {
                removeFun(-1);
              }}
            >
              <RemoveIcon />
            </IconButton>
            <IconButton
              disabled={disabled}
              onClick={() => {
                addFun({});
              }}
            >
              <AddIcon />
            </IconButton>
          </Paper>
        </Paper>
      </Paper>
    );
  }
}
