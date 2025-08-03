export type User = {
  handle: string;
  name: string;
  email: string;
  _id: string;
  description: string;
  image: string;
  links: string;
  colorFrom: string;
  colorVia: string;
  colorTo: string;
};

export type UserHandle = Pick<
  User,
  | "description"
  | "handle"
  | "image"
  | "links"
  | "name"
  | "colorFrom"
  | "colorVia"
  | "colorTo"
>;

export type RegisterForm = Pick<User, "handle" | "email" | "name"> & {
  password: string;
  password_confirmation: string;
};

export type LoginForm = Pick<User, "email"> & {
  password: string;
};

export type ProfileForm = Pick<
  User,
  "handle" | "description" | "colorFrom" | "colorVia" | "colorTo"
>;

export type SocialNetworks = {
  id: number;
  name: string;
  url: string;
  enabled: boolean;
};

export type DevTreeLink = Pick<SocialNetworks, "name" | "url" | "enabled">;
