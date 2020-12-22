import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';

import ListProductsService from './ListProductsService';

let fakeProductsRepository: FakeProductsRepository;
let listProducts: ListProductsService;

describe('ListProductsService', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();

    listProducts = new ListProductsService(fakeProductsRepository);
  });

  it('should be able to list products', async () => {
    const prod1 = await fakeProductsRepository.create({
      brand: 'Prod 1',
      description: 'Product 1',
      image: 'www.lider.cl/catalogo/images/gamesIcon.svg',
      price: 235494,
    });

    const prod2 = await fakeProductsRepository.create({
      brand: 'Prod 2',
      description: 'Product 2',
      image: 'www.lider.cl/catalogo/images/smartphoneIcon.svg',
      price: 849666,
    });

    const products = await listProducts.execute();

    // console.log('providers===>', providers);

    expect(products).toEqual([prod1, prod2]);
  });
});
