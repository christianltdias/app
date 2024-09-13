export type Validator = (value: string) => string | null;

export const required: Validator = (value: string) => {
  return value ? null : 'This field is required'
}

export const minLength = (length: number): Validator => (value: string) => {
  return value && value.length >= length ? null : `Minimum length is ${length}`;
};

export const maxLength = (length: number): Validator => (value: string) => {
  return value && value.length <= length ? null : `Maximum length is ${length}`;
};