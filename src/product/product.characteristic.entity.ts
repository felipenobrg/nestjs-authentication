import { Column, Entity } from 'typeorm';

@Entity('product-characteriscts')
export class ProductCharacteristic {
  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'description', length: 100, nullable: false })
  description: string;
}
