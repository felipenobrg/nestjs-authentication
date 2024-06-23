import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { ProductDTO } from './dto/ListProduct.dto';
import { UpdateProductDTO } from './dto/UpdateProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(productEntity: ProductEntity) {
    await this.productRepository.save(productEntity);
  }

  async listProducts() {
    const productSaved = await this.productRepository.find({
      relations: ['characteristics', 'images'],
    });
    const productList = productSaved.map(
      (product) =>
        new ProductDTO(
          product.id,
          product.userId,
          product.name,
          product.value,
          product.quantity,
          product.description,
          product.category,
          product.characteristics.map((c) => ({
            name: c.name,
            description: c.description,
          })),
          product.images.map((i) => ({
            url: i.url,
            description: i.description,
          })),
        ),
    );

    return productList;
  }

  async updateProduct(id: string, productEntity: UpdateProductDTO) {
    await this.productRepository.update(id, productEntity);
  }

  async removeProduct(id: string) {
    await this.productRepository.delete(id);
  }
}
