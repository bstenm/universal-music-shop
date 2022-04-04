import { ref, getStorage, uploadBytes, FirebaseStorage, getDownloadURL } from 'firebase/storage';

import { log } from 'libs/logger';
import { firebaseApp } from 'libs/firebaseApp';
import { avatarsStoragePath } from 'config/index';

export class StorageService {
    private storage!: FirebaseStorage;

    constructor() {
        log.debug('Initialise Storage Service');
        this.storage = getStorage(firebaseApp);
    }

    public async uploadAvatar(name: string, file: File): Promise<string> {
        // The avatar will be saved as the argument passed
        const filepath = `${avatarsStoragePath}/${name}`;
        const storageRef = ref(this.storage, filepath);
        const snapshot = await uploadBytes(storageRef, file);
        return getDownloadURL(snapshot.ref);
    }
}

// Export as singleton
export const storageService = new StorageService();
