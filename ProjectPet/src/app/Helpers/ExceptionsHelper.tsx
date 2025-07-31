import { isAxiosError, type AxiosError } from "axios";
import { toast } from "react-toastify";
import type { Envelope } from "../../models/responses";
import { errorConsts, errorMessages } from "./Errors";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";
import type { Error as BackendError } from "../../models/responses";

export default class ExceptionsHelper {
  static ToastError(
    exception:
      | AxiosError
      | FetchBaseQueryError
      | SerializedError
      | Error
      | Error[]
      | unknown,
    rethrow: boolean = true,
    errorPrefix: string | undefined = "Error: "
  ) {
    let errorMessage: any | undefined = undefined;

    errorMessage ??= ExceptionsHelper.tryHandleUndefinedError(exception);
    errorMessage ??= ExceptionsHelper.tryHandleAxiosError(exception);
    errorMessage ??= ExceptionsHelper.tryHandleFetchBaseQueryError(exception);
    errorMessage ??= ExceptionsHelper.tryHandleErrorArray(exception);
    errorMessage ??= exception;

    toast(errorPrefix + errorMessage);
    if (rethrow && exception instanceof Error) throw exception;
  }

  static tryHandleUndefinedError(exception: any) {
    if (exception) return undefined;

    return errorConsts.Unknown;
  }

  static tryHandleAxiosError(exception: any) {
    if (isAxiosError<Envelope<any>>(exception) == false) return undefined;
    if (exception.response?.data?.errors == undefined) return undefined;

    return formatErrorArray(exception.response?.data?.errors);
  }

  static tryHandleFetchBaseQueryError(exception: any) {
    if ("status" in exception == false) return undefined;

    const errorData = exception.data as Envelope<null> | undefined;
    if (!errorData || !errorData?.errors) return errorConsts.Server; // couldnt parse | no errors sent
    return formatErrorArray(errorData.errors); // could parse | errors sent
  }

  static tryHandleErrorArray(exception: any) {
    if (exception.constructor !== Array) return undefined;
    return formatErrorArray(exception);
  }
}

function formatErrorArray(errors: BackendError[]) {
  return errors
    .map((err) => {
      return errorMessages[err.code] || err.message || errorConsts.Unknown;
    })
    .join("; ");
}
