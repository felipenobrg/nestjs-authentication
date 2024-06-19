import { Column, Entity } from 'typeorm';

@Entity({ name: 'product-images' })
export class ProductImage {
  @Column({ name: 'url', length: 100, nullable: false })
  url: string;

  @Column({ name: 'description', length: 100, nullable: false })
  description: string;
}
