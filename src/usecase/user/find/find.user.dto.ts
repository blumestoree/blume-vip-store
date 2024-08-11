export interface InputFindUserDto {
	id: string;
}
export interface OutputFindUserDto {
	id: string;
	name: string;
	email: string;
	userOnServer: {
		id: string;
		server: {
			id: string;
			name: string;
			image: string;
		};
		gameUserId: string;
		nickname: string;
	}[];
}
