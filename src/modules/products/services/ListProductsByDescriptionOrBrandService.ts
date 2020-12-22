import { injectable, inject } from 'tsyringe';

import palindrome from '@shared/utils';

import Product from '@modules/products/infra/typeorm/schemas/Product';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';

interface IRequest {
  search: string;
}

@injectable()
class ListProductsByDescriptionOrBrand {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ search }: IRequest): Promise<Product[]> {
    let products = await this.productsRepository.findAllProductsByDescriptionOrBrand(
      { search },
    );

    // if (product && palindrome(product.id.toString())) {
    //   console.log('Palin{dromo!!');
    //   product.setPercentOfDiscount(0.5);
    // }(

    if (palindrome(search)) {
      products = products.map(prod => {
        prod.setPercentOfDiscount(0.5);
        return prod;
      });
    }

    return products;
  }
}

export default ListProductsByDescriptionOrBrand;
