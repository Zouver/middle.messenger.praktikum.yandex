import type {ValidatorFn} from "./types.ts";

export const required = (fieldName = "Поле"): ValidatorFn => (value) =>
  value.trim() ? null : `${fieldName} обязательно`;

export const email = (): ValidatorFn => (value:string) =>
  /\S+@\S+\.\S+/.test(value) ? null : "Некорректный email";

export const minLength = (len: number, fieldName = "Поле"): ValidatorFn => (value) =>
  value.length >= len ? null : `${fieldName} должно быть не короче ${len} символов`;

export const passwordStrong = (): ValidatorFn => (value) =>
  /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/.test(value)
    ? null
    : "Пароль должен содержать цифру и заглавную букву";