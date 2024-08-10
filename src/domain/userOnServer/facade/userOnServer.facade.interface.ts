export interface InputCreateUserOnServerFacadeDto {
	userId: string;
	serverId: string;
	gameUserId: string;
	nickname: string;
}
export interface OutputCreateUserOnServerFacadeDto {
	userId: string;
	serverId: string;
	gameUserId: string;
	nickname: string;
}

export default interface UserOnServerFacadeInterface {
	createUserOnServer(input: InputCreateUserOnServerFacadeDto): Promise<OutputCreateUserOnServerFacadeDto>;
}
