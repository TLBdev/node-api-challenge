const express = require('express');
const database = require('../helpers/actionModel')
const router = express.Router();


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

router.get('/:id', validateactionId, (req, res) => {
    database.get(req.params.id)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(500).json({ message: '500 error' })
        })
});


router.delete('/:id', validateactionId, (req, res) => {
    database.remove(req.params.id)
        .then(() => {
            res.status(200).json({ message: 'delete: successful' })
        })
        .catch(err => {
            res.status(500).json({ message: '500 error' })
        })
});

router.put('/:id', validateactionId, (req, res) => {
    database.update(req.params.id, req.body)
        .then(() => {
            res.status(200).json({ message: 'update: successful' })
        })
        .catch(err => {
            res.status(500).json({ message: '500 error' })
        })
});

function validateactionId(req, res, next) {
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