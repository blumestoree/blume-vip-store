export interface OutputFindAllServerDto {
  servers: {
    id: string;
    name: string;
    serverOwnerId: string;
  }[];
}
