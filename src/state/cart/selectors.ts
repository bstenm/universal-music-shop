import { ICartItem } from 'interfaces';
import { RootState } from 'app/store';

export const cartIsOpen = (state: RootState): boolean => state.cart.open;

export const getItemsInCart = (state: RootState): ICartItem[] => state.cart.items;

export const getNbOfItemInCart = (state: RootState): number => state.cart.items.length;
