import { Request, Response, Router } from 'express';
import ProductRouteInterface from './product.route.interface';
import CreateProductUsecaseFactory from '../../../usecase/product/create/create.product.usecase.factory';
import UpdateProductUsecaseFactory from '../../../usecase/product/update/update.product.usecase.factory';
import FindAllProductUsecaseFactory from '../../../usecase/product/findAll/findAll.product.usecase.factory';
import FindByIdProductUsecaseFactory from '../../../usecase/product/find/find.product.usecase.factory';
import multer from 'multer';
import path from 'path';

class ProductRoute implements ProductRouteInterface {
  router: Router;
  multer = multer({
    dest: path.resolve(__dirname, '..', '..', '..', '..', 'tpm'),
    storage: multer.diskStorage({
      destination: path.resolve(__dirname, '..', '..', '..', '..', 'tpm'),
      filename: (req, file, cb) => {
        const fileName = Date.now() + '-' + file.originalname;
        cb(null, fileName);
      },
    }),
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const allowedMines = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];
      allowedMines.includes(file.mimetype) ? cb(null, true) : cb(new Error('Invalid file type'));
    },
  });

  constructor() {
    this.router = Router();
    this.findAllProduct();
    this.createProduct();
    this.updateProduct();
    this.findProduct();
  }

  findAllProduct() {
    this.router.get('/findAllProduct', async (req: Request, res: Response) => {
      const { serverId, sort, categoryId } = req.query;
      const useCase = FindAllProductUsecaseFactory.create();

      let arrayCategoryId = categoryId;

      if (categoryId) {
        arrayCategoryId = Array.isArray(categoryId)
          ? (categoryId as string[])
          : ([categoryId] as string[]);
      }

      const serverDto = {
        serverId: serverId as string,
        categoryId: arrayCategoryId as undefined | string[],
        sort: (sort as 'desc' | 'asc') || undefined,
      };

      try {
        const output = await useCase.execute(serverDto);
        res.send(output);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).send({ error: error.message });
        }
      }
    });
  }

  createProduct() {
    this.router.post(
      '/createProduct',
      this.multer.single('file'),
      async (req: Request, res: Response) => {
        const useCase = CreateProductUsecaseFactory.create();
        const { name, price, serverId, categoryId, gameItemName } = req.body;
        const size = req.file;
        const productDto = {
          name,
          gameItemName,
          categoryId,
          image: size?.filename || '',
          price: +price,
          serverId,
        };
        try {
          const output = await useCase.execute(productDto);
          res.send(output);
        } catch (error) {
          if (error instanceof Error) {
            res.status(500).send({ error: error.message });
          }
        }
      },
    );
  }

  updateProduct() {
    this.router.put('/updateProduct/:id', async (req: Request, res: Response) => {
      const useCase = UpdateProductUsecaseFactory.create();
      const { name, image, price, serverId, gameItemName } = req.body;
      const { id } = req.params;
      const productDto = {
        id,
        name,
        gameItemName,
        image,
        price,
        serverId,
      };
      try {
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
      const { id } = req.params;
      const productDto = { id };
      const useCase = FindByIdProductUsecaseFactory.create();
      try {
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
