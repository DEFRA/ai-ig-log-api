const insertOne = async (db, collectionName, document) => {
  const result = await db.collection(collectionName).insertOne(document)
  return result.insertedId
}

const findOneAndUpdate = async (
  db,
  collectionName,
  query,
  document,
  options = {}
) => {
  const result = await db
    .collection(collectionName)
    .findOneAndUpdate(query, { $set: document }, options)
  return result
}

const findOne = async (db, collectionName, query, projection = {}) => {
  const result = await db
    .collection(collectionName)
    .findOne(query, { projection })
  return result
}

const findMany = async (db, collectionName) => {
  const cursor = db
    .collection(collectionName)
    .find({}, { projection: { _id: 0 } })
  return await cursor.toArray()
}

const updateOne = async (db, collectionName, query, update) => {
  const result = await db
    .collection(collectionName)
    .updateOne(query, update, { upsert: true })
  return result.upsertedCount > 0 ? 'inserted' : 'updated'
}

const deleteOne = async (db, collectionName, query) => {
  const result = await db.collection(collectionName).deleteOne(query)
  return result.deletedCount
}

const aggregatetoArray = async (db, collectionName, pipeline) => {
  const result = await db
    .collection(collectionName)
    .aggregate(pipeline)
    .toArray()
  return result
}

const aggregatetoNext = async (db, collectionName, pipeline) => {
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
