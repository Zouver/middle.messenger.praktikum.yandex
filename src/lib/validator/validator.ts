import type {ValidatorFn} from "./types.ts";

export function validateField(value: string, validators: ValidatorFn[]): string | boolean {
  for (const validator of validators) {
    const err = validator(value);
    if (err) return err;
  }
  return false;
}
