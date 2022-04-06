import { IMarketItem } from 'interfaces';

export interface IProductsState {
    items: IMarketItem[];
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
}
