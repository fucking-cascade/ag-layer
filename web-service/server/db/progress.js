const casual = require('casual')

casual.define('progress', () => {
  return {
    id: casual.uuid,
    ownerId: casual.uuid,
    projectId: casual.uuid,
    name: casual.title,
    order: casual.integer(0),
  }
})

const db = new Array(5).fill(1).map(() => casual.progress)

const apis = {
  find (id) {
    return db.find(instance => instance.id === id)
  },
  findByOwner (id) {
    return db.filter(instance => instance.ownerId === id)
  },
  findByProject (id) {
    return db.filter(instance => instance.projectId === id)
  },
  add (ownerId, projectId, name) {
    const instance = {...casual.progress, ownerId, projectId, name}
    db.unshift(instance)
    return instance
  },
  addMany (times, ownerId, projectId, names) {
    return new Array(times).fill(1).map((_, index) => this.add(ownerId, projectId, names[index]))
  },
}

module.exports = {
  apis, db,
}