import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class ProductCharacteristicDTO {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;
}

export class ProductImageDTO {
  @IsUrl()
  url: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;
}

export class CreateProductDTO {
  @IsUUID(undefined)
  userId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(1)
  value: number;

  @IsNumber()
  @Min(0)
  quantity: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(3)
  @Type(() => ProductCharacteristicDTO)
  characteristic: ProductCharacteristicDTO[];

  @ValidateNested()
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ProductImageDTO)
  image: ProductImageDTO[];

  @IsString()
  @IsNotEmpty()
  category: string;
}
