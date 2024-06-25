export interface InputUpdateServerOwnerDto {
  id: string;
  name: string;
  email: string;
  password: string;
  server: string[];
}
export interface OutputCreateServerOwnerDto {
  id: string;
  name: string;
  email: string;
  server: string[];
}
