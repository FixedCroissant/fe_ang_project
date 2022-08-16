export interface User {
  id?: number;
  name: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
  password?: string;
  ConfirmPassword?: string;
}
