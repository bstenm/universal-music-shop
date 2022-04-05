import { User } from 'config/types';
import { RootState } from 'app/store';

export const getUserId = (state: RootState): string => state.user.id;

export const getUserData = (state: RootState): User => state.user;

export const isUserLoggedIn = (state: RootState): boolean => !!state.user.id;
