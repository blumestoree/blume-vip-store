export interface InputCreateUserDto {
  name: string;
  password: string;
  email: string;
}
export interface OutputCreateUserDto {
  userId: string;
  name: string;
  email: string;
}
