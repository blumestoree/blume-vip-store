import { v4 as uuid } from "uuid";
import Product from "../entity/product.entity";

export default class ProductFactory {
	static create(
		name: string,
		gameItemName: string,
		image: string,
		price: number,
		serverId: string,
		categoryId: string,
		id?: string,
		paymentsId?: string[],
	): Product {
		return new Product(id || uuid(), name, gameItemName, image, price, serverId, categoryId, paymentsId || []);
	}
}
