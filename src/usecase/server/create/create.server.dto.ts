export interface InputCreateServerDto {
	name: string;
	slug: string;
	image: string;
	banner: string[];
	serverOwnerId: string;
}
export interface OutputCreateServerDto {
	id: string;
	name: string;
	slug: string;
	image: string;
	banner: string[];
	serverOwnerId: string;
	products: string[];
	categories: string[];
}
