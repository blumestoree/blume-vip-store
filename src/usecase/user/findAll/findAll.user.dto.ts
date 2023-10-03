export interface OutputFindAllUserDto {
  users: {
    id: string;
    name: string;
    email: string;
  }[];
}
