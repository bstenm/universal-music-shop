// In its own file to avoid circular dependency
import { RootState } from 'app/store';
import { RequestStatus } from 'types';
import { ICartItem, IMarketItem } from 'interfaces';

export const cartIsOpen = (state: RootState): boolean => state.cart.open;

export const getItemsInCart = (state: RootState): ICartItem[] => state.cart.items;

export const getActionStatus = (state: RootState): RequestStatus => state.cart.status;

export const getNbOfItemInCart = (state: RootState): number => state.cart.items.length;

export const getFeaturedProduct = (state: RootState): IMarketItem => state.cart.featuredProduct;
