export interface IUser {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
    lastName?: string;
    createdAt?: number;
    firstName?: string;
    assets?: ICartItem[];
}

export interface IMarketItem {
    id: string | number;
    title: string;
    price: string;
    image: string;
    description: string;
    available: boolean;
    variantId: string | number;
}

export interface ICartItem extends Omit<IMarketItem, 'available'> {
    cartId: string;
    quantity: number;
}
