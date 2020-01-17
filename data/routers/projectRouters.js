const express = require('express');
const database = require('../helpers/projectModel')
const router = express.Router();
const actionDatabase = require('../helpers/actionModel')

router.get('/', (req, res) => {
    database.get()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({
                message: 'Server side error'
            })
        })
});

router.get('/:id', validateProjectId, (req, res) => {
    database.get(req.params.id)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(500).json({ message: '500 error' })
        })
});

router.get('/:id/actions', validateProjectId, (req, res) => {
    database.getProjectActions(req.params.id)
        .then(comments => {
            if (comments[0]) {
                res.status(200).json(comments)
            } else {
                res.status(404).json({
                    errorMessage: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                errorMessage: 'Error 500: This is a server side error. If this error persists contact your server admin. '
            })
        })
});

router.post('/:id/actions', validateProjectId, (req, res) => {
    const { description, notes } = req.body

    const project_id = req.params.id
    actionDatabase.insert({ description, notes, project_id })
        .then(data => {
            console.log(data.id)

            res.status(201).json(data)

        })

        .catch(error => {
            console.log(error)
            res.status(500).json({
                errorMessage: 'Error 500: This is a server side error. If this error persists contact your server admin. '
            })
        })
});

router.post('/', (req, res) => {
    database.insert(req.body)
        .then(() => {
            res.status(201).json({ message: 'POST: successful' })
        })
        .catch(err => {
            res.status(500).json({ message: '500 error' })
        })
});

router.delete('/:id', validateProjectId, (req, res) => {
    database.remove(req.params.id)
        .then(() => {
            res.status(200).json({ message: 'delete: successful' })
        })
        .catch(err => {
            res.status(500).json({ message: '500 error' })
        })
});

router.put('/:id', validateProjectId, (req, res) => {
    database.update(req.params.id, req.body)
        .then(() => {
            res.status(200).json({ message: 'update: successful' })
        })
        .catch(err => {
            res.status(500).json({ message: '500 error' })
        })
});

function validateProjectId(req, res, next) {
    database.get(req.params.id)
        .then(data => {

            console.log(data.id)
            req.user = data
            next()



        })
        .catch(err => {
            res.status(400).json({ message: "invalid user id" })
        })
}

module.exports = router