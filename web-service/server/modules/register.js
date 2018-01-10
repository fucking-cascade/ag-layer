const user = require('../db/user')
const project = require('../db/project')
const progress = require('../db/progress')
const task = require('../db/task')

const typeDefine = `
  type RichProgress {
    id: ID
    ownerId: ID
    projectId: ID
    name: String
    order: Int,
    tasks: [Task]
  }
  type RichProject {
    id: ID
    ownerId: ID
    name: String
    description: String
    progresses: [RichProgress]
  }

  type Register {
    user: User
    projects: [RichProject]
  }
  
  type Mutation {
    register(email: String!, passport: String!): Register
  }
`

const resolver = {
  Mutation: {
    register (root, {email, passport}, ctx) {
      const userInstance = user.apis.add(email, passport)
      const userId = userInstance.id
      const projectInstance = project.apis.add(userId, 'Welcome to GroupUp', 'Click here to open a whole new way of working')
      const progressNames = ['Simple to understand', 'Advanced features', 'Start collaboration', 'test']
      const progressInstances = progress.apis.addMany(progressNames.length, userId, projectInstance.id, progressNames)
      const taskNames = [
        ['↓ Click the blue button to add a task', '√ Click on the left box to complete the task'],
        ['Management project in the application', 'Fun task board'],
        ['① Create a "project"', '② Add your own companion to the project'],
        ['Meet the needs of business management statistics'],
      ]
      const taskInstances = progressInstances.map(({id}, i) => {
        const names = taskNames[i]
        return task.apis.addMany(names.length, userId, id, names)
      })

      const richProjects = [{
        ...projectInstance,
        progresses: progressInstances
          .map((prog, i) => ({...prog, tasks: taskInstances[i]})),
      }]
      return {user: userInstance, projects: richProjects}
    },
  },
}

module.exports = {
  typeDefine,
  resolver,
}