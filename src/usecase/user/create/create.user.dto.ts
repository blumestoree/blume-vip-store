export interface InputCreateUserDto {
  name: string;
  gameUserId: string;
  password: string;
  email: string;
}
export interface OutputCreateUserDto {
  id: string;
  name: string;
  gameUserId: string;
  email: string;
  token: string;
  refreshToken: {
    id: string;
    expiresIn: number;
  };
}
