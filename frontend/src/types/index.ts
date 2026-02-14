export type User = {
  username: string;
  email: string;
  avatar?: string;
  role: "admin" | "user";
  isOnline: boolean;
  lastSeen: number;
};

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type ResetPasswordPayload = {
  otp: string;
  password: string;
};
