import { v4 } from 'uuid';

import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IFindAllProductsByDescriptionOrBrandDTO from '@modules/products/dtos/IFindAllProductsByDescriptionOrBrandDTO';
import IFindProductByIdDTO from '@modules/products/dtos/IFindProductByIdDTO';
import Product from '@modules/products/infra/typeorm/schemas/Product';

import IProductsRepository from '../IProductsRepository';

class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  public async create({
    brand,
    description,
    image,
    price,
  }: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, {
      _id: v4(),
      id: this.products.length + 1,
      brand,
      description,
      image,
      price,
    });

    this.products.push(product);

    return product;
  }

  public async findProductById({
    id,
  }: IFindProductByIdDTO): Promise<Product | undefined> {
    return this.products.find(prod => prod.id === id);
  }

  public async findAllProductsByDescriptionOrBrand({
    search,
  }: IFindAllProductsByDescriptionOrBrandDTO): Promise<Product[]> {
    return this.products.filter(
      prod =>
        prod.brand.indexOf(search) > -1 ||
        prod.description.indexOf(search) > -1,
    );
  }

  public async findAll(): Promise<Product[]> {
    return this.products;
  }
}

export default FakeProductsRepository;
