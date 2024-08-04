import ProductRepository from "../../../infrastructure/product/repositories/product.repository";
import CreateProductUseCase from "./create.product.usecase";
import SaveImageCloud from "../../../infrastructure/product/uploadImage/product.uploadImage";
import CategoryFacade from "../../../domain/category/facade/category.facade";
import FindCategoryUsecaseFactory from "../../category/find/find.category.usecase.factory";
export default class CreateProductUsecaseFactory {
	static create() {
		const categoryUseCase = FindCategoryUsecaseFactory.create();

		return new CreateProductUseCase(
			new ProductRepository(),
			new CategoryFacade(categoryUseCase),
			new SaveImageCloud(),
		);
	}
}
