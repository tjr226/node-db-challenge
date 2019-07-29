const express = require('express');

const db = require('../data/gtdDB.js');

const router = express.Router();

router.post('/', (req, res) => {
    const actionInfo = req.body;
    // console.log(actionInfo);
    db.insertAction(actionInfo)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(error => {
            res.status(500).json({ error: "The action could not be saved." });
        })
})


router.get('/', (req, res) => {
    db.findActions()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(error => {
            res.status(500).json(error);
        })
})

module.exports = router;