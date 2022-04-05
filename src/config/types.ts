export interface User {
    id: string;
    email: string;
    name?: string;
    avatar?: string;
    lastName?: string;
    createdAt?: number;
    firstName?: string;
    assets?: IPurchasedItem[];
}
export interface IMarketItem {
    id: string | number;
    title: string;
    price: string;
    image: string;
    description: string;
    available: boolean;
}
export interface IPurchasedItem extends Omit<IMarketItem, 'available'> {
    quantity: number;
}
