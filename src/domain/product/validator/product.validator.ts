import * as z from "zod";
import type { ValidationError } from "../../../shared/types/IValidationError";
import type ValidatorInterface from "../../../shared/validator.interface";
import type Product from "../entity/product.entity";

export default class ProductValidator implements ValidatorInterface<Product> {
	validate(entity: Product): ValidationError[] | void {
		const productSchema = z.object({
			_id: z.string(),
			_price: z.number(),
			_name: z.string().min(2, "Nome inválido"),
			_category: z.any(),
			_image: z.string(),
			_serverId: z.string(),
			_gameItemName: z.string(),
		});
		try {
			productSchema.parse(entity);
		} catch (error) {
			const zodError = error as z.ZodError;
			const errorMessages = zodError.errors.map((issue) => issue.message);
			throw new Error(errorMessages.map((issue) => issue).join(", "));
		}
	}
}
