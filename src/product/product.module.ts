import { Module } from '@nestjs/common';
import { ProductRepository } from './dto/product.repository';
import { ProdutoController } from './product.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [ProdutoController],
  providers: [ProductRepository],
})
export class ProductModule {}
