async function insertOne(db, collectionName, document) {
  const result = await db.collection(collectionName).insertOne(document)
  return result.insertedId
}

async function findOneAndUpdate(
  db,
  collectionName,
  query,
  document,
  options = {}
) {
  const result = await db
    .collection(collectionName)
    .findOneAndUpdate(query, { $set: document }, options)
  return result
}

async function findOne(db, collectionName, query, projection = {}) {
  const result = await db
    .collection(collectionName)
    .findOne(query, { projection })
  return result
}

async function findMany(db, collectionName) {
  const cursor = db
    .collection(collectionName)
    .find({}, { projection: { _id: 0 } })
  return await cursor.toArray()
}

async function updateOne(db, collectionName, query, update) {
  const result = await db
    .collection(collectionName)
    .updateOne(query, update, { upsert: true })
  return result.upsertedCount > 0 ? 'inserted' : 'updated'
}

async function deleteOne(db, collectionName, query) {
  const result = await db.collection(collectionName).deleteOne(query)
  return result.deletedCount
}

async function aggregatetoArray(db, collectionName, pipeline) {
  const result = await db
    .collection(collectionName)
    .aggregate(pipeline)
    .toArray()
  return result
}

async function aggregatetoNext(db, collectionName, pipeline) {
  const result = await db.collection(collectionName).aggregate(pipeline).next()
  return result
}

export {
  insertOne,
  findOneAndUpdate,
  findOne,
  findMany,
  updateOne,
  deleteOne,
  aggregatetoArray,
  aggregatetoNext
}
