export interface OutputFindAllServerDto {
  servers: {
    serverId: string;
    name: string;
    serverOwnerId: number;
  }[];
}
