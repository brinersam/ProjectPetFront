import { isAxiosError, type AxiosError } from "axios";
import { toast } from "react-toastify";
import type { Envelope } from "../../models/responses";
import { errorConsts, errorMessages } from "./Errors";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { SerializedError } from "@reduxjs/toolkit";

export default class ExceptionsHelper {
  static ToastError(
    exception: AxiosError | FetchBaseQueryError | SerializedError | Error,
    rethrow: boolean = true,
    errorPrefix: string | undefined = "Error: "
  ) {
    let errorMessage: any | undefined = undefined;

    errorMessage ??= ExceptionsHelper.tryHandleAxiosError(exception);
    errorMessage ??= ExceptionsHelper.tryHandleFetchBaseQueryError(exception);
    errorMessage ??= exception;

    toast(errorPrefix + errorMessage);
    if (rethrow && exception instanceof Error) throw exception;
  }

  static tryHandleAxiosError(exception: any) {
    if (isAxiosError<Envelope<any>>(exception) == false) return undefined;

    return exception.response?.data?.errors.map((x) => x.message).join("; ");
  }

  static tryHandleFetchBaseQueryError(exception: any) {
    if ("status" in exception == false) return undefined;

    const errorData = exception.data as Envelope<null> | undefined;
    if (!errorData || !errorData?.errors) return errorConsts.Server; // couldnt parse | no errors sent

    const messages = errorData?.errors.map((err) => {
      return errorMessages[err.code] || err.message || errorConsts.Unknown;
    });
    return messages?.join("; "); // could parse | errors sent
  }
}
