import { openDB } from 'idb';

export async function initDB() {
    const db = await openDB('auth-db', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('sessions')) {
                db.createObjectStore('sessions');
            }
        },
    });
    return db;
}

export async function setSession(sessionData) {
    const db = await initDB();
    await db.put('sessions', sessionData, 'currentSession');
}

export async function getSession() {
    const db = await initDB();
    return await db.get('sessions', 'currentSession');
}

export async function clearSession() {
    const db = await initDB();
    await db.delete('sessions', 'currentSession');
}

export async function updateSession(sessionData) {
    const db = await initDB();
    const currentSession = await db.get('sessions', 'currentSession');
    const updatedSession = { ...currentSession, ...sessionData };
    await db.put('sessions', updatedSession, 'currentSession');
}
