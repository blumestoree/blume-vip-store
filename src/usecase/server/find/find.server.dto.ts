export interface InputFindServerDto {
	id: string;
}
export interface OutputFindServerDto {
	id: string;
	name: string;
	slug: string;
	image: string;
	banner: string[];
	serverOwnerId: string;
	products: string[];
	categories: string[];
}
