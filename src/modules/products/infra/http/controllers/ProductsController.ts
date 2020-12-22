// Controllers must have at most 5 methods: index (List), show, create, update and delete
// Controllers are responsible to receive requests, forward those requests to other files and give the response back

import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductService from '@modules/products/services/CreateProductService';
import ListProductsByDescriptionOrBrandService from '@modules/products/services/ListProductsByDescriptionOrBrandService';
import ListProductsByIdService from '@modules/products/services/ListProductsByIdService';
import ListProductsService from '@modules/products/services/ListProductsService';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    // const user_id = request.user.id;
    const { search } = request.query;

    const listProducts = container.resolve(ListProductsService);
    const listProductsByDescriptionOrBrand = container.resolve(
      ListProductsByDescriptionOrBrandService,
    );

    let products;

    if (!search) {
      products = await listProducts.execute();
    } else {
      const searchFormatted = search.toString();
      products = await listProductsByDescriptionOrBrand.execute({
        search: searchFormatted,
      });
    }

    return response.json(classToClass(products));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { brand, description, image, price } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      brand,
      description,
      image,
      price,
    });

    return response.json(classToClass(product));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const product_id = parseInt(id, 10);

    const listProductsById = container.resolve(ListProductsByIdService);
    const product = await listProductsById.execute({ id: product_id });

    return response.json(classToClass(product));
  }
}
