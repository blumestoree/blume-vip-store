export interface InputFindWithParamServerDto {
	name?: string;
	id?: string;
	slug?: string;
}
export interface OutputFindWithParamServerDto {
	id: string;
	name: string;
	slug: string;
	image: string;
	banner: string[];
	serverOwnerId: string;
	products: string[];
	categories: string[];
}
