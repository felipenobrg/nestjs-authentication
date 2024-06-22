import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductRepository {
  private product: ProductEntity[] = [];

  listAll() {
    return this.product;
  }

  save(productData: ProductEntity) {
    this.product.push(productData);
    return productData;
  }

  private searchId(id: string) {
    const possibleProduct = this.product.find((product) => product.id === id);

    if (!possibleProduct) {
      throw new Error("Produto don't exist");
    }

    return possibleProduct;
  }

  async update(id: string, productData: Partial<ProductEntity>) {
    const dataNotUpdated = ['id', 'userId'];
    const product = this.searchId(id);
    Object.entries(productData).forEach(([key, value]) => {
      if (dataNotUpdated.includes(key)) {
        return;
      }
      product[key] = value;
    });

    return product;
  }

  async remove(id: string) {
    const removedProduct = this.searchId(id);
    this.product = this.product.filter((produto) => produto.id !== id);
    return removedProduct;
  }
}
