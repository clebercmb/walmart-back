import { Expose } from 'class-transformer';
import { ObjectID, Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity('products')
class Product {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  id: number;

  @Column()
  brand: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column()
  price: number;

  private percentOfDiscount = 0;

  public setPercentOfDiscount(percentOfDiscount: number): void {
    this.percentOfDiscount = percentOfDiscount;
  }

  @Expose({ name: 'percentOfDiscount' })
  getPercentOfDiscount(): number {
    return this.percentOfDiscount;
  }

  @Expose({ name: 'priceWithDiscount' })
  getPriceWithDiscount(): number {
    return this.price - this.price * this.percentOfDiscount;
  }
}

export default Product;
