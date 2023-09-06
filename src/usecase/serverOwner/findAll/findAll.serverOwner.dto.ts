export interface OutputFindAllServerOwnerDto {
  serverOwners: {
    serverOwnerId: string;
    name: string;
    email: string;
    serverId?: number;
  }[];
}
