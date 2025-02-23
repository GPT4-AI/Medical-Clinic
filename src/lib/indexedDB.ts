export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("medicalClinicDB", 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Create stores for all entities
      const stores = [
        "patients",
        "doctors",
        "appointments",
        "consultations",
        "treatments",
        "invoices",
        "payments",
        "schedules",
        "notifications",
      ];

      stores.forEach((storeName) => {
        if (!db.objectStoreNames.contains(storeName)) {
          db.createObjectStore(storeName, {
            keyPath: "id",
            autoIncrement: true,
          });
        }
      });
    };
  });
}

export async function getAllItems(storeName: string) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = (db as IDBDatabase).transaction(storeName, "readonly");
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function addItem(storeName: string, item: any) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = (db as IDBDatabase).transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.add(item);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function updateItem(storeName: string, item: any) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = (db as IDBDatabase).transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.put(item);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function deleteItem(storeName: string, id: number) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = (db as IDBDatabase).transaction(storeName, "readwrite");
    const store = transaction.objectStore(storeName);
    const request = store.delete(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}
