import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';

import ListProductsByDescriptionOrBrandService from './ListProductsByDescriptionOrBrandService';

let fakeProductsRepository: FakeProductsRepository;
let listProductsByDescriptionOrBrand: ListProductsByDescriptionOrBrandService;

describe('ListProductsByDescriptionOrBrandService', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();

    listProductsByDescriptionOrBrand = new ListProductsByDescriptionOrBrandService(
      fakeProductsRepository,
    );
  });

  it('should be able to list products by a search', async () => {
    const prod1 = await fakeProductsRepository.create({
      brand: 'Prod 1',
      description: 'Product abba 1',
      image: 'www.lider.cl/catalogo/images/gamesIcon.svg',
      price: 235494,
    });

    const prod2 = await fakeProductsRepository.create({
      brand: 'Prod 2',
      description: 'Product 2',
      image: 'www.lider.cl/catalogo/images/smartphoneIcon.svg',
      price: 849666,
    });

    const prod3 = await fakeProductsRepository.create({
      brand: 'Prod abba 3',
      description: 'Product 2',
      image: 'www.lider.cl/catalogo/images/computerIcon.svg',
      price: 890348,
    });

    const products1 = await listProductsByDescriptionOrBrand.execute({
      search: 'Prod',
    });
    expect(products1).toEqual([prod1, prod2, prod3]);

    const products2 = await listProductsByDescriptionOrBrand.execute({
      search: 'Prod 2',
    });
    expect(products2).toEqual([prod2]);
  });

  it('should be able to list products by a palindrome search', async () => {
    const prod1 = await fakeProductsRepository.create({
      brand: 'Prod 1',
      description: 'Product abba 1',
      image: 'www.lider.cl/catalogo/images/gamesIcon.svg',
      price: 235494,
    });

    await fakeProductsRepository.create({
      brand: 'Prod 2',
      description: 'Product 2',
      image: 'www.lider.cl/catalogo/images/smartphoneIcon.svg',
      price: 849666,
    });

    const prod2 = await fakeProductsRepository.create({
      brand: 'Prod abba 1',
      description: 'Product 2',
      image: 'www.lider.cl/catalogo/images/computerIcon.svg',
      price: 890348,
    });

    const product = await listProductsByDescriptionOrBrand.execute({
      search: 'abba',
    });

    // console.log('providers===>', providers);

    expect(product).toEqual([prod1, prod2]);
  });

  it('should be able to apply discount to an palindrome seach', async () => {
    await fakeProductsRepository.create({
      brand: 'Prod 1',
      description: 'Product abba 1',
      image: 'www.lider.cl/catalogo/images/gamesIcon.svg',
      price: 235494,
    });

    await fakeProductsRepository.create({
      brand: 'Prod 2',
      description: 'Product 2',
      image: 'www.lider.cl/catalogo/images/smartphoneIcon.svg',
      price: 849666,
    });

    await fakeProductsRepository.create({
      brand: 'Prod abba 1',
      description: 'Product 2',
      image: 'www.lider.cl/catalogo/images/computerIcon.svg',
      price: 890348,
    });

    const product = await listProductsByDescriptionOrBrand.execute({
      search: 'abba',
    });

    expect(product[0].getPriceWithDiscount()).toEqual(235494 * 0.5);
    expect(product[1].getPriceWithDiscount()).toEqual(890348 * 0.5);
  });
});
