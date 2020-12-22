import ICreateProductDTO from '../dtos/ICreateProductDTO';
import IFindAllProductsByDescriptionOrBrandDTO from '../dtos/IFindAllProductsByDescriptionOrBrandDTO';
import IFindProductByIdDTO from '../dtos/IFindProductByIdDTO';
import Product from '../infra/typeorm/schemas/Product';

export default interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  findProductById(data: IFindProductByIdDTO): Promise<Product | undefined>;
  findAllProductsByDescriptionOrBrand(
    data: IFindAllProductsByDescriptionOrBrandDTO,
  ): Promise<Product[]>;
  findAll(): Promise<Product[]>;
}
