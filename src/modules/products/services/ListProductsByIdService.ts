import { injectable, inject } from 'tsyringe';

import palindrome from '@shared/utils';

import Product from '@modules/products/infra/typeorm/schemas/Product';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';

interface IRequest {
  id: number;
}

@injectable()
class ListProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Product | undefined> {
    const product = await this.productsRepository.findProductById({ id });

    if (product && palindrome(product.id.toString())) {
      product.setPercentOfDiscount(0.5);
    }

    return product;
  }
}

export default ListProductsService;
