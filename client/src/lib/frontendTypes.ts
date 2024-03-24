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
export type LoginFn = (member?: Member) => Promise<void>;
export type RegisterFn = (member?: Member) => Promise<void>;
export type AuthContextType = {
  auth: Member | undefined;
  reviews: Review[];
  businesses: Business[];
  createReviewFn: (review: Review) => Promise<void>;
  formError: Error | undefined;
  login: LoginFn;
  register: RegisterFn;
};
