import {
  ValidationError,
  ValidationPipe as BaseValidationPipe,
} from "@nestjs/common";
import { HttpErrorByCode } from "@nestjs/common/utils/http-error-by-code.util";

export class ValidationPipe extends BaseValidationPipe {
  // Same as the base class, but do not flatten the errors.
  // Original method https://github.com/nestjs/nest/blob/88c8cf81d4b3c2a32c67d829bf8b7a8abfffa69f/packages/common/pipes/validation.pipe.ts#L167
  public createExceptionFactory() {
    return (validationErrors: ValidationError[] = []) => {
      if (this.isDetailedOutputDisabled) {
        return new HttpErrorByCode[this.errorHttpStatusCode]();
      }
      return new HttpErrorByCode[this.errorHttpStatusCode](validationErrors);
    };
  }
}
