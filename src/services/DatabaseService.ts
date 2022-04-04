import {
    doc,
    query,
    setDoc,
    addDoc,
    getDoc,
    getDocs,
    collection,
    deleteDoc,
    updateDoc
} from 'firebase/firestore';

import { log } from 'libs/logger';
import { User } from 'state/user/userSlice';
import { database } from 'libs/firebaseApp';
import { IMarketItem, IPurchasedItem } from 'config/types';
import { getDocSnapshotData, getQuerySnapshotData, setRecord } from 'libs/firestoreUtils';

const userCollection = 'users';
const assetCollection = 'assets';
const marketItemCollection = 'marketItems';

export class DatabaseService {
    public static async addUser(data: User): Promise<void> {
        log.debug('Add user data into collection:', data);
        const docRef = doc(database, userCollection, data.id);
        await setDoc(docRef, setRecord<User>(data));
        log.debug('Successfully added user with id', data.id);
    }

    public static async updateUser(id: string, data: Partial<User>): Promise<void> {
        log.debug('Set user data into collection:', data);
        await setDoc(doc(database, userCollection, id), data, { merge: true });
        log.debug('Successfully updated user data with:', data);
    }

    public static async addToUserAssets(userId: string, data: IPurchasedItem): Promise<void> {
        log.debug('Add asset:', data, ' to user:', userId);
        const colRef = collection(database, `${userCollection}/${userId}/${assetCollection}`);
        await addDoc(colRef, setRecord<IPurchasedItem>(data));
        log.debug('Successfully updated asset to user', userId);
    }

    public static async deleteUserAsset(userId: string, assetId: string): Promise<void> {
        log.debug('Update asset:', assetId, ' from user:', userId);
        const docRef = doc(database, userCollection, userId, assetCollection, assetId);
        await deleteDoc(docRef);
        log.debug('Successfully deleted user asset from database:', assetId);
    }

    public static async getUserById(id: string): Promise<User> {
        log.debug('Attempt to get user with id:', id);
        const docRef = doc(database, userCollection, id);
        const docSnap = await getDoc(docRef);
        log.debug('Received from FIRESTORE:', docSnap.data());
        const data = getDocSnapshotData<User>(docSnap);
        log.debug('Successfully retrieved user:', data);
        return data;
    }

    public static async getUserAssets(id: string): Promise<IPurchasedItem[]> {
        log.debug('Get assets from user with id:', id);
        const queryRef = query(collection(database, userCollection, id, assetCollection));
        const querySnap = await getDocs(queryRef);
        const data = getQuerySnapshotData<IPurchasedItem>(querySnap);
        log.debug('Successfully retrieved assets', data, 'from user:', id);
        return data;
    }

    public static async updateMarketItem(
        id: string,
        data: Record<string, string | number>
    ): Promise<void> {
        log.debug('Update item:', id, ' with data:', data);
        const docRef = doc(database, marketItemCollection, id);
        await updateDoc(docRef, data);
        log.debug('Successfully updated item', id);
    }

    public static async getAllMarketItems(): Promise<IMarketItem[]> {
        log.debug('Get all market items');
        const q = query(collection(database, marketItemCollection));
        const querySnapshot = await getDocs(q);
        const data = getQuerySnapshotData<IMarketItem>(querySnapshot);
        log.debug('Successfully retrieved all market items:', data);
        return data;
    }

    public static async getMarketItem(id: string): Promise<IMarketItem> {
        log.debug('Get market item with id:', id);
        const docRef = doc(database, marketItemCollection, id);
        const docSnap = await getDoc(docRef);
        const data = getDocSnapshotData<IMarketItem>(docSnap);
        log.debug('Successfully retrieved market item:', data);
        return data;
    }

    /* == HELPER  FUNCTIONS == */

    public static updateMarketItemAvailability(id: string, availability: number): Promise<void> {
        return DatabaseService.updateMarketItem(id, { availability });
    }
}
