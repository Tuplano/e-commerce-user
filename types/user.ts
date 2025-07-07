export interface userData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// types/user.ts
export interface IUser {
  _id: string;
  username: string;
  email: string;
  password?: string;
  contact?: string;
  address?: string;
  role?: string;
}
