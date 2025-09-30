import { openDB } from "idb";

const DB_NAME = "football-meta-db";
const STORE_NAME = "pendingCompetition";

function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
}

export async function savePendingCompetition(data) {
  const db = await getDB();
  await db.put(STORE_NAME, data, "competition");
}

export async function getPendingCompetition() {
  const db = await getDB();
  return db.get(STORE_NAME, "competition");
}

export async function removePendingCompetition() {
  const db = await getDB();
  await db.delete(STORE_NAME, "competition");
}
