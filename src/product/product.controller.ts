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

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly productRepository: ProductRepository) {}

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
    product.characteristic = productData.characteristic;
    product.image = productData.image;

    const produtoCadastrado = this.productRepository.save(product);
    return produtoCadastrado;
  }

  @Get()
  async listaTodos() {
    return this.productRepository.listAll();
  }

  @Put('/:id')
  async atualiza(
    @Param('id') id: string,
    @Body() productData: UpdateProductDTO,
  ) {
    const produtoAlterado = await this.productRepository.update(
      id,
      productData,
    );

    return {
      message: 'Product updated successfully',
      product: produtoAlterado,
    };
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const removedProduct = await this.productRepository.remove(id);

    return {
      message: 'Product removided successfully',
      product: removedProduct,
    };
  }
}
