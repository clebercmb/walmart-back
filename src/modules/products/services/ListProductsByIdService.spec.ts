import FakeProductsRepository from '@modules/products/repositories/fakes/FakeProductsRepository';

import ListProductsByIdService from './ListProductsByIdService';

let fakeProductsRepository: FakeProductsRepository;
let litsProductsById: ListProductsByIdService;

describe('LitProductsByIdService', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();

    litsProductsById = new ListProductsByIdService(fakeProductsRepository);
  });

  it('should be able to list products', async () => {
    const prod1 = await fakeProductsRepository.create({
      brand: 'Prod 1',
      description: 'Product 1',
      image: 'www.lider.cl/catalogo/images/gamesIcon.svg',
      price: 235494,
    });

    await fakeProductsRepository.create({
      brand: 'Prod 2',
      description: 'Product 2',
      image: 'www.lider.cl/catalogo/images/smartphoneIcon.svg',
      price: 849666,
    });

    const { id } = prod1;
    const product = await litsProductsById.execute({ id });

    // console.log('providers===>', providers);

    expect(product).toEqual(prod1);
  });
});
