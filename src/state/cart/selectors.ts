import { RootState } from 'app/store';

export const getNbOfItemInCart = (state: RootState): number => state.cart.length;
