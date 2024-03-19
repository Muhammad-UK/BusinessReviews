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
export interface SpecializedError extends Error {
  status?: number;
}
