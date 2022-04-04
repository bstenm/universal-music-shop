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
