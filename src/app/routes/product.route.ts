import { Request, Response, Router } from 'express';
import FindAllProductUseCase from '../../usecase/product/findAll/findAll.product.usecase';
import ProductRepository from '../../infrastructure/product/repositories/product.repository';
import CreateProductUseCase from '../../usecase/product/create/create.product.usecase';
import FindProductUseCase from '../../usecase/product/find/find.product.usecase';
import UpdateProductUseCase from '../../usecase/product/update/update.product.usecase';

class ProductRoute {
  router: Router;

  constructor() {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.get('/findAllProduct', async (req: Request, res: Response) => {
      const useCase = new FindAllProductUseCase(new ProductRepository());
      try {
        const output = await useCase.execute();
        res.send(output);
      } catch (error) {
        res.status(500).send(error);
      }
    });
    this.router.post('/createProduct', async (req: Request, res: Response) => {
      const useCase = new CreateProductUseCase(new ProductRepository());
      const { name, price, serverId } = req.body;
      try {
        const productDto = {
          name,
          price,
          serverId,
        };
        const output = await useCase.execute(productDto);
        res.send(output);
      } catch (error) {
        res.status(500).send(error);
      }
    });
    this.router.put('/updateProduct/:id', async (req: Request, res: Response) => {
      const useCase = new UpdateProductUseCase(new ProductRepository());
      const { name, price, serverId } = req.body;
      const { id } = req.params;
      try {
        const productDto = {
          productId: id,
          name,
          price,
          serverId,
        };
        const output = await useCase.execute(productDto);
        res.send(output);
      } catch (error) {
        res.status(500).send(error);
      }
    });
    this.router.get('/findProduct/:id', async (req: Request, res: Response) => {
      const useCase = new FindProductUseCase(new ProductRepository());
      const { id } = req.params;
      try {
        const productDto = {
          productId: id,
        };
        const output = await useCase.execute(productDto);
        res.send(output);
      } catch (error) {
        res.status(500).send(error);
      }
    });
  }
}

export default new ProductRoute().router;
