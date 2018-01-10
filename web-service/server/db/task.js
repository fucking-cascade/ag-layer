const casual = require('casual')

casual.define('task', () => {
  return {
    id: casual.uuid,
    ownerId: casual.uuid,
    progressId: casual.uuid,
    name: casual.title,
    content: casual.text,
    state: false,
    ddl: '2018-12-31 23:59:59',
  }
})

const db = new Array(13).fill(1).map(() => casual.task)

const apis = {
  find (id) {
    return db.find(instance => instance.id === id)
  },
  findByOwner (id) {
    return db.filter(instance => instance.ownerId === id)
  },
  add (ownerId, progressId, name) {
    const instance = {...casual.task, ownerId, progressId, name}
    db.unshift(instance)
    return instance
  },
  addMany (times, ownerId, progressId, names) {
    return new Array(times).fill(1).map((_, index) => this.add(ownerId, progressId, names[index]))
  },
}

module.exports = {
  apis, db
}