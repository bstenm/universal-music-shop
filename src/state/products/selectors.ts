import { RootState } from 'app/store';
import { IMarketItem } from 'config/types';
import { IProductsState } from 'state/products/interface';

export const fetchProducts = (state: RootState): IProductsState => state.products;

export const getProductData = (state: RootState, productId: string): IMarketItem => {
    return state.products.items.find((product: IMarketItem) => product.id === productId);
};
