const casual = require('casual')

casual.define('user', () => {
  return {
    id: casual.uuid,
    email: casual.email,
    name: casual.last_name,
    gender: casual.boolean,
    address: casual.address,
    phoneNumber: casual.phone,
    timestamp: casual.unix_time,
  }
})

const db = new Array(10).fill(1).map(() => casual.user)

const apis = {
  find (id) {
    return db.find(instance => instance.id === id)
  },
  add (email) {
    const instance = {...casual.user, email}
    db.unshift(instance)
    return instance
  },
}

module.exports = {
  apis, db
}
