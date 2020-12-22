import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

// import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

// providersRouter.use(ensureAuthenticated);

productsRouter.get('/', productsController.index);

productsRouter.get(
  '/:provider_id/month-availability/',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  productsController.index,
);

productsRouter.get(
  '/:provider_id/day-availability/',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  productsController.index,
);

productsRouter.get(
  '/:id/',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.required(),
    },
  }),
  productsController.show,
);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      brand: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required(),
      price: Joi.required(),
    },
  }),
  productsController.create,
);

export default productsRouter;
