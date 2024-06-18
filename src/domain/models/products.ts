export interface CreateProducts {
    name: string;
    description: string;
    price: number;
    categoryId: string;
    img?: string;
}

export interface CreateImages {
    url: string;
    productId: string;
}
