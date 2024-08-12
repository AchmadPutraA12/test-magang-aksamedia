import { openDB } from 'idb';

export async function initUserDB() {
    const db = await openDB('user-db', 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains('users')) {
                const store = db.createObjectStore('users', {
                    keyPath: 'id',
                    autoIncrement: true,
                });
                store.createIndex('email', 'email', { unique: true });
            }
        },
    });
    return db;
}

export async function getAllUsers() {
    const db = await initUserDB();
    return await db.getAll('users');
}

export async function addUser(user) {
    const db = await initUserDB();
    return await db.add('users', user);
}

export async function updateUser(user) {
    const db = await initUserDB();
    return await db.put('users', user);
}

export async function deleteUser(id) {
    const db = await initUserDB();
    return await db.delete('users', id);
}

export async function getUserById(id) {
    const db = await initUserDB();
    return await db.get('users', id);
}

export async function getUserByEmail(email) {
    const db = await initUserDB();
    return await db.getFromIndex('users', 'email', email);
}

export async function createDefaultUser() {
    const users = await getAllUsers();
    if (users.length === 0) {
        await addUser({
            name: 'Default User',
            email: 'admin@gmail.com',
            password: 'admin123',
        });
    }
}
