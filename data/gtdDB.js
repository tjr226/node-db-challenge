const db = require('./db-config.js');

module.exports = {
    insertProject,
    insertAction,
    findProjects,
    findActions,
    findProjectById
}

function findProjects() {
    return db('projects');
}

function findActions() {
    return db('actions');
}

function insertProject(project) {
    return db('projects')
        .insert(project)
        .then(project => {
            return project[0]
        })
}

function insertAction(action) {
    return db('actions')
        .insert(action)
        .then(action => {
            return action[0]
        })
}

function findProjectById(id) {
    return db('projects')

        .join('actions', 'projects.id', 'actions.project_id')
        .select('actions.id as action_id', 'actions.is_completed as action_completed', 'actions.*', 'projects.*')
    .where({ project_id: id })

}
