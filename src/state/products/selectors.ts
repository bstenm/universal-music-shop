import { RootState } from 'app/store';
import { IMarketItem } from 'interfaces';
import { IProductsState } from 'state/products/interface';

export const getProducts = (state: RootState): IProductsState => state.products;

export const getProductData = (state: RootState, productId: string | number): IMarketItem => {
    return state.products.items.find((product: IMarketItem) => product.id === productId);
};
