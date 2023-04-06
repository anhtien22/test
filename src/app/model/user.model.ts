export interface IUser {
  find(arg0: (a: any) => boolean): unknown;
  id: number;
  userName: string;
  fullName: string;
  password: string;
  email: null | string;
  role: number;
  status: boolean;
}
