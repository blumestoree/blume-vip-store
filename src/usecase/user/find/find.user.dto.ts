export interface InputFindUserDto {
	id: string;
}
export interface OutputFindUserDto {
	id: string;
	name: string;
	email: string;
	userOnServer: {
		id: string;
		server: string;
		gameUserId: string;
		nickname: string;
	}[];
}
