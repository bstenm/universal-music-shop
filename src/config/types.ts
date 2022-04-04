export interface IMarketItem {
    id: string;
    price: number;
    image: string;
    description: string;
    availability: number;
}
export interface IPurchasedItem extends Omit<IMarketItem, 'availability'> {
    quantity: number;
}
