import { getMongoRepository, MongoRepository } from 'typeorm';

import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IFindAllProductsByDescriptionOrBrandDTO from '@modules/products/dtos/IFindAllProductsByDescriptionOrBrandDTO';
import IFindProductByIdDTO from '@modules/products/dtos/IFindProductByIdDTO';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';

import Product from '../schemas/Product';

class ProductsRepository implements IProductsRepository {
  private ormRepository: MongoRepository<Product>;

  private products: Product[] = [];

  constructor() {
    this.ormRepository = getMongoRepository(Product, 'mongo');
  }

  public async create({
    brand,
    image,
    description,
    price,
  }: ICreateProductDTO): Promise<Product> {
    const product = await this.ormRepository.create({
      brand,
      description,
      image,
      price,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async findProductById({
    id,
  }: IFindProductByIdDTO): Promise<Product | undefined> {
    const findProduct = await this.ormRepository.findOne({
      where: { id },
    });
    return findProduct;
  }

  public async findAllProductsByDescriptionOrBrand({
    search,
  }: IFindAllProductsByDescriptionOrBrandDTO): Promise<Product[]> {
    const findProducts = await this.ormRepository.find();

    return findProducts.filter(
      prod =>
        prod.brand.indexOf(search) > -1 ||
        prod.description.indexOf(search) > -1,
    );
  }

  public async findAll(): Promise<Product[]> {
    return this.ormRepository.find();
  }
}

export default ProductsRepository;
