import { isAxiosError, type AxiosError } from "axios";
import { toast } from "react-toastify";
import type { Envelope } from "../../models/responses";

export default class ExceptionsHelper {
  static ToastError(
    exception: any,
    errorPrefix: string | undefined = undefined
  ) {
    let errorMessage: string | AxiosError | undefined = undefined;

    if (isAxiosError<Envelope<any>>(exception)) {
      errorMessage = exception.response?.data?.errors
        .map((x) => x.message)
        .join(" ");
    }

    if (errorMessage === undefined) errorMessage = exception;

    errorPrefix ??= "Error: ";

    toast(errorPrefix + errorMessage);

    throw exception;
  }
}
