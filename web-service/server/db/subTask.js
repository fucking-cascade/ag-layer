const casual = require('casual')

casual.define('subTask', () => {
  return {
    id: casual.uuid,
    userId: casual.uuid,
    taskId: casual.uuid,
    content: casual.text,
    state: casual.boolean,
  }
})

const db = new Array(12).fill(1).map(() => casual.subTask)

const apis = {
  find (id) {
    return db.find(instance => instance.id === id)
  },
  findByUser (id) {
    return db.filter(instance => instance.userId === id)
  },
  findByTask (id) {
    return db.filter(instance => instance.taskId === id)
  },
  add (userId, taskId, content) {
    const instance = {...casual.subTask, userId, taskId, content, state: false}
    db.push(instance)
    return instance
  },
}

module.exports = {
  apis, db
}