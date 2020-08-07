import { ValidationError } from 'yup';

export function TypeSafeGuard() {
  function isValidationError(validationError: ValidationError | any): validationError is ValidationError {
    return (validationError as ValidationError).errors !== undefined;
  }

  return {
    isValidationError,
  }
}
