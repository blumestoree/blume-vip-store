import ServerValidatorFactory from "../factory/server.factory.validator";
export default class Server {
	private _id: string;
	private _name: string;
	private _slug: string;
	private _image: string;
	private _banner: string[];
	private _serverOwnerId: string;
	private _products: string[];
	private _categories: string[];
	private _userOnServer: string[];

	constructor(
		id: string,
		name: string,
		slug: string,
		image: string,
		banner: string[],
		serverOwnerId: string,
		products: string[],
		categories: string[],
		userOnServer: string[],
	) {
		this._id = id;
		this._name = name;
		this._slug = slug;
		this._image = image;
		this._banner = banner;
		this._serverOwnerId = serverOwnerId;
		this._products = products;
		this._categories = categories;
		this._userOnServer = userOnServer;
		// this._validate();
	}

	get id(): string {
		return this._id;
	}

	get image(): string {
		return this._image;
	}

	get products(): string[] {
		return this._products;
	}

	get categories(): string[] {
		return this._categories;
	}

	get banner(): string[] {
		return this._banner;
	}

	get serverOwnerId(): string {
		return this._serverOwnerId;
	}

	get userOnServer(): string[] {
		return this._userOnServer;
	}

	get name(): string {
		return this._name;
	}

	get slug(): string {
		return this._slug;
	}

	private _validate() {
		ServerValidatorFactory.create().validate(this);
	}

	changeName(name: string) {
		this._name = name;
	}
}
