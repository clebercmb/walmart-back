import { injectable, inject } from 'tsyringe';

import Product from '@modules/products/infra/typeorm/schemas/Product';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';

interface IRequest {
  brand: string;
  description: string;
  image: string;
  price: number;
}

@injectable()
class CreateProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    brand,
    description,
    image,
    price,
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.create({
      brand,
      description,
      image,
      price,
    });

    return product;
  }
}

export default CreateProductsService;
