const express = require('express');

const db = require('../data/gtdDB.js');

const router = express.Router();

router.post('/', (req, res) => {
    const projectInfo = req.body;
    db.insertProject(projectInfo)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(error => {
            res.status(500).json({ error: "The project could not be saved." });
        })
})

router.get('/', (req, res) => {
    db.findProjects()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db.findProjectById(id)
        .then(project => {
            
            if (project) {
                let project_to_return = {};
                project_to_return.id = project[0].id;
                project_to_return.name = project[0].project_name;
                project_to_return.description = project[0].project_description;
                project_to_return.completed = project[0].is_completed;
                project_to_return.actions = []

                var i;
                for (i = 0; i < project.length; i++) {
                    project_to_return.actions[i] = {};
                    project_to_return.actions[i].id = project[i].action_id;
                    project_to_return.actions[i].description = project[i].action_description;
                    project_to_return.actions[i].notes = project[i].action_notes;
                    project_to_return.actions[i].completed = project[i].action_completed;
                }
                
                res.status(200).json(project_to_return);
                // res.status(200).json(project);
            } else {
                res.status(404).json({ message: 'not found' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        })
})
module.exports = router;