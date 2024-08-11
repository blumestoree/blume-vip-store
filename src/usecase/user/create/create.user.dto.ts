export interface InputCreateUserDto {
	name: string;
	password: string;
	email: string;
	serverId: string;
	gameUserId: string;
	nickname: string;
}
export interface OutputCreateUserDto {
	id: string;
	name: string;
	email: string;
	token: string;
	refreshToken: {
		id: string;
		expiresIn: number;
	};
}
