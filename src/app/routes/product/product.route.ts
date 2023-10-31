import { Request, Response, Router } from 'express';
import ProductRouteInterface from './product.route.interface';
import CreateProductUsecaseFactory from '../../../usecase/product/create/create.product.usecase.factory';
import UpdateProductUsecaseFactory from '../../../usecase/product/update/update.product.usecase.factory';
import FindAllProductUsecaseFactory from '../../../usecase/product/findAll/findAll.product.usecase.factory';
import FindByIdProductUsecaseFactory from '../../../usecase/product/find/find.product.usecase.factory';

class ProductRoute implements ProductRouteInterface {
  router: Router;

  constructor() {
    this.router = Router();
    this.findAllProduct();
    this.createProduct();
    this.updateProduct();
    this.findProduct();
  }

  findAllProduct() {
    this.router.get('/findAllProduct', async (req: Request, res: Response) => {
      const useCase = FindAllProductUsecaseFactory.create();
      try {
        const output = await useCase.execute();
        res.send(output);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).send({ error: error.message });
        }
      }
    });
  }

  createProduct() {
    this.router.post('/createProduct', async (req: Request, res: Response) => {
      const useCase = CreateProductUsecaseFactory.create();
      const { name, image, price, serverId } = req.body;
      try {
        const productDto = {
          name,
          image,
          price,
          serverId,
        };
        const output = await useCase.execute(productDto);
        res.send(output);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).send({ error: error.message });
        }
      }
    });
  }

  updateProduct() {
    this.router.put('/updateProduct/:id', async (req: Request, res: Response) => {
      const useCase = UpdateProductUsecaseFactory.create();
      const { name, image, price, serverId } = req.body;
      const { id } = req.params;
      try {
        const productDto = {
          id,
          name,
          image,
          price,
          serverId,
        };
        const output = await useCase.execute(productDto);
        res.send(output);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).send({ error: error.message });
        }
      }
    });
  }

  findProduct() {
    this.router.get('/findProduct/:id', async (req: Request, res: Response) => {
      const useCase = FindByIdProductUsecaseFactory.create();
      const { id } = req.params;
      try {
        const productDto = { id };
        const output = await useCase.execute(productDto);
        res.send(output);
      } catch (error) {
        if (error instanceof Error) {
          res.status(404).send({ error: error.message });
        }
      }
    });
  }
}

export default new ProductRoute().router;
