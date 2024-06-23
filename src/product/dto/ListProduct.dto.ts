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

  constructor(
    id: string,
    userId: string,
    name: string,
    price: number,
    quantity: number,
    description: string,
    category: string,
    features: ProductFeatureDTO[],
    images: ProductImageDTO[],
  ) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.description = description;
    this.category = category;
    this.features = features;
    this.images = images;
  }
}
