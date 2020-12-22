import { injectable, inject } from 'tsyringe';

import Product from '@modules/products/infra/typeorm/schemas/Product';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(): Promise<Product[] | null> {
    const products = await this.productsRepository.findAll();

    return products;
  }
}

export default ListProductsService;
