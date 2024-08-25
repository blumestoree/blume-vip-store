export interface InputFindServerFacadeDto {
	id: string;
}
export interface OutputFindServerFacadeDto {
	id: string;
	name: string;
	slug: string;
	image: string;
	banner: string[];
	serverOwnerId: string;
	products: string[];
	categories: string[];
}

export default interface ServerFacadeInterface {
	findServer(input: InputFindServerFacadeDto): Promise<OutputFindServerFacadeDto>;
}
