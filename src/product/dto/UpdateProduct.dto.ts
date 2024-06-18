import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProductCharacteristicDTO, ProductImageDTO } from './CreateProduct.dto';

export class UpdateProductDTO {
  @IsUUID()
  id: string;

  @IsUUID()
  usuarioId: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nome: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @IsOptional()
  @Min(1)
  @IsOptional()
  valor: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  quantidadeDisponivel: number;

  @IsString()
  @IsOptional()
  descricao: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => ProductCharacteristicDTO)
  @IsOptional()
  caracteristicas: ProductCharacteristicDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductImageDTO)
  @IsOptional()
  imagens: ProductImageDTO[];

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  categoria: string;
}
