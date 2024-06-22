import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product-characteriscts')
export class ProductCharacteristic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'description', length: 100, nullable: false })
  description: string;
}
