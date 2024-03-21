export type Member = {
  id: string;
  username: string;
  password: string;
};
export type Business = {
  id: string;
  name: string;
  description: string;
  city: string;
  photo_url?: string;
};
export type LoginFn = (member?: Member) => void;
export type RegisterFn = (member?: Member) => void;
export type AuthFormProps = {
  login: LoginFn;
  register: RegisterFn;
  formError: Error | undefined;
};
