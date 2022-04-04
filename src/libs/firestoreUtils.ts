import { DocumentData, DocumentSnapshot, QuerySnapshot, serverTimestamp } from 'firebase/firestore';

export const setRecord = <T>(data: T): T => ({ ...data, createdAt: serverTimestamp() });

export const getDocSnapshotData = <T>(snapshot: DocumentSnapshot<DocumentData>): T => {
    let item = snapshot.data();
    item = item && { ...item, id: snapshot.id };
    if (item?.createdAt) {
        item.createdAt = item.createdAt.toMillis();
    }
    return item as T;
};

export const getQuerySnapshotData = <T>(snapshot: QuerySnapshot<DocumentData>): T[] => {
    const items: T[] = [];
    snapshot.forEach((d) => {
        let data = d.data();
        data = data && { ...data, id: d.id };
        if (data?.createdAt) {
            data.createdAt = data.createdAt.toMillis();
        }
        items.push(data as T);
    });
    return items;
};
