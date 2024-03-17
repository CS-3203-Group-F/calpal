/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g5c9qzsvdijo1gt")

  collection.name = "groups"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g5c9qzsvdijo1gt")

  collection.name = "Groups"

  return dao.saveCollection(collection)
})
