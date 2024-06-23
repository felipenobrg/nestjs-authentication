import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ProductEntity } from './product.entity';
import { ProductRepository } from './product.repository';
import { CreateProductDTO } from './dto/CreateProduct.dto';
import { UpdateProductDTO } from './dto/UpdateProduct.dto';
import { ProductService } from './product.service';

@Controller('produtos')
export class ProductController {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productService: ProductService,
  ) {}

  @Post()
  async criaNovo(@Body() productData: CreateProductDTO) {
    const product = new ProductEntity();

    product.id = randomUUID();
    product.name = productData.name;
    product.userId = productData.userId;
    product.value = productData.value;
    product.quantity = productData.quantity;
    product.description = productData.description;
    product.category = productData.category;
    // product.characteristic = productData.characteristic;
    // product.image = productData.image;

    const productRegistred = this.productService.createProduct(product);
    return productRegistred;
  }

  @Get()
  async listAll() {
    return this.productService.listProducts();
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() productData: UpdateProductDTO) {
    const productChanged = await this.productService.updateProduct(
      id,
      productData,
    );

    return {
      message: 'Product updated successfully',
      product: productChanged,
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const removedProduct = await this.productService.removeProduct(id);

    return {
      message: 'Product removided successfully',
      product: removedProduct,
    };
  }
}
