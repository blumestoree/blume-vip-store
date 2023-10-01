export interface OutputFindAllUserDto {
  users: {
    userId: string;
    name: string;
    email: string;
  }[];
}
