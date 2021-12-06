const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const admin = require("firebase-admin");

module.exports = {
  setup: async function(serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    global.googlefirebasecloudfirestoredb = getFirestore();
  },
  get: async function(prefix,key) {
    const collection = await googlefirebasecloudfirestoredb.collection(prefix);
    const docRef = await collection.doc(key)
    const doc = await docRef.get()
    const data = await doc.data()
    return data
  },
  set: async function(prefix,key,value) {
    const collection = await googlefirebasecloudfirestoredb.collection(prefix);
    const docRef = await collection.doc(key)
    docRef.set(value)
  },
  delete: async function(prefix,key) {
    const collection = await googlefirebasecloudfirestoredb.collection(prefix);
    const docRef = await collection.doc(key)
    docRef.delete()
  },
  list: async function(prefix) {
    const list = await googlefirebasecloudfirestoredb.collection(prefix).select()
    return list
  }
}