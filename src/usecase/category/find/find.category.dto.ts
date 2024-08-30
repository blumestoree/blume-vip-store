export interface InputFindCategoryDto {
	id: string;
	serverId: string;
}
export interface OutputFindCategoryDto {
	id: string;
	name: string;
	functionInGame: string;
	serverId: string;
	products: {
		id: string;
		name: string;
		image: string;
		price: number;
		serverId: string;
		gameItemName: string;
	}[];
}
