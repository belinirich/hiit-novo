// Utility to store and retrieve user-provided stretch card images using IndexedDB with localStorage fallback

const DB_NAME = 'hiit21_stretch_db';
const STORE_NAME = 'stretch_images';
const DB_VERSION = 1;

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported'));
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveStretchImage(postureNumber: number, dataUrl: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(dataUrl, `posture_${postureNumber}`);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    try {
      localStorage.setItem(`hiit21_stretch_img_${postureNumber}`, dataUrl);
    } catch (e) {
      console.warn('Could not store stretch image in storage', e);
    }
  }
}

export async function getStretchImage(postureNumber: number): Promise<string | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(`posture_${postureNumber}`);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch {
    try {
      return localStorage.getItem(`hiit21_stretch_img_${postureNumber}`) || null;
    } catch {
      return null;
    }
  }
}

export async function getAllStretchImages(): Promise<{ [postureNumber: number]: string }> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.openCursor();
      const results: { [key: number]: string } = {};

      req.onsuccess = (e) => {
        const cursor = (e.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          const keyStr = String(cursor.key);
          const match = keyStr.match(/posture_(\d+)/);
          if (match) {
            results[parseInt(match[1], 10)] = cursor.value;
          }
          cursor.continue();
        } else {
          resolve(results);
        }
      };
      req.onerror = () => resolve({});
    });
  } catch {
    const results: { [key: number]: string } = {};
    for (let i = 1; i <= 40; i++) {
      const val = localStorage.getItem(`hiit21_stretch_img_${i}`);
      if (val) results[i] = val;
    }
    return results;
  }
}

export async function removeStretchImage(postureNumber: number): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).delete(`posture_${postureNumber}`);
  } catch {
    localStorage.removeItem(`hiit21_stretch_img_${postureNumber}`);
  }
}

export async function clearAllStretchImages(): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).clear();
  } catch {
    // clear localstorage items
    for (let i = 1; i <= 40; i++) {
      localStorage.removeItem(`hiit21_stretch_img_${i}`);
    }
  }
}

// Helper to deduce posture number from filename, e.g. "Rotação lombar deitada com instruções-17.png" -> 17
export function parsePostureNumberFromFileName(filename: string): number | null {
  const clean = filename.replace(/\.[^/.]+$/, '').trim();
  const matchEnd = clean.match(/[-_\s](\d{1,2})$/);
  if (matchEnd) {
    const num = parseInt(matchEnd[1], 10);
    if (num >= 1 && num <= 40) return num;
  }
  const matchAny = clean.match(/(?:card|postura|alongamento|rotina)?[-_\s#]*(\d{1,2})/i);
  if (matchAny) {
    const num = parseInt(matchAny[1], 10);
    if (num >= 1 && num <= 40) return num;
  }
  return null;
}
