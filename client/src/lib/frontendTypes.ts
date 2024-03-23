export type Review = {
  id: string;
  member_id: string;
  member_name?: string;
  business_id: string;
  business_name?: string;
  rating: number;
  comment: string;
};
export type Member = {
  id: string;
  username: string;
  password: string;
  reviews: Review[];
};
export type Business = {
  id: string;
  name: string;
  description: string;
  city: string;
  photo_url?: string;
  reviews: Review[];
};
export type LoginFn = (member?: Member) => void;
export type RegisterFn = (member?: Member) => void;
export type AuthFormProps = {
  login: LoginFn;
  register: RegisterFn;
  formError: Error | undefined;
};
