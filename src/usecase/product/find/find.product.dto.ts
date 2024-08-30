export interface InputFindProductDto {
	id: string;
}
export interface OutputFindProductDto {
	id: string;
	name: string;
	gameItemName: string;
	image: string;
	price: number;
	serverId: string;
	categoryId: string;
}
