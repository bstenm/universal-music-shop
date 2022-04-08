// In its own file to avoid circular dependency
import { RootState } from 'app/store';
import { IUser, ICartItem } from 'interfaces';

export const getUserId = (state: RootState): string => state.user.id;

export const getUserData = (state: RootState): IUser => state.user;

export const isUserLoggedIn = (state: RootState): boolean => !!state.user.id;

export const getUserPurchases = (state: RootState): ICartItem[] => state.user.purchases || [];
