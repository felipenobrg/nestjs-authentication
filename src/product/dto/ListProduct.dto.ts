class ProductFeatureDTO {
  name: string;
  description: string;
}

class ProductImageDTO {
  url: string;
  description: string;
}

export class ProductDTO {
  id: string;
  userId: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  category: string;
  features: ProductFeatureDTO[];
  images: ProductImageDTO[];
}
