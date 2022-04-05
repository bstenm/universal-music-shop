import { IMarketItem } from 'config/types';

export interface IProductsState {
    items: IMarketItem[];
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
}
