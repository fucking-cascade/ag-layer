const casual = require('casual')

casual.define('project', () => {
  return {
    id: casual.uuid,
    ownerId: casual.uuid,
    name: casual.title,
    description: casual.description,
  }
})

const db = new Array(2).fill(1).map(() => casual.project)

const apis = {
  find (id) {
    return db.find(instance => instance.id === id)
  },
  findByOwner (id) {
    return db.filter(instance => instance.ownerId === id)
  },
  add (ownerId, name, description) {
    const instance = {...casual.project, ownerId, name, description}
    db.unshift(instance)
    return instance
  },
}

module.exports = {
  apis, db,
}