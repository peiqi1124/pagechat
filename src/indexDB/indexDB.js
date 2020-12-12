import Dexie from "dexie";

const db = new Dexie("pageDB");
db.version(1).stores({
  friendRequst: `++id,userId`,
  friendMessage: `++id,userId,userName,message`,
});

export default db;
