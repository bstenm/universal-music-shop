import { IMarketItem } from 'interfaces';
import { RequestStatus } from 'types';

export interface IProductsState {
    items: IMarketItem[];
    status: RequestStatus;
}
