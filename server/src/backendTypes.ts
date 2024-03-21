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
export type Review = {
  id: string;
  member_id: string;
  business_id: string;
  rating: string;
  body: string;
};
export interface SpecializedError extends Error {
  status?: number;
}
