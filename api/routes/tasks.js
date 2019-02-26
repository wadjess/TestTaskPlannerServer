const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Task = require('../models/task');

router.get('/', (req, res, next) => {
    Task.find()
        .exec()
        .then(tasks => {
            res.status(200).json(tasks);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.post('/', (req, res, next) => {
    const newTask = new Task({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        parent_id: req.body.parent_id
    });
    newTask.save()
        .then(result => {
            console.log(result),
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.patch('/:id', (req, res, next) => {
    const updateOps = req.body;

    Task.update({ _id: req.params.id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log("From database ", result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Task.remove({ _id: id })
        .exec()
        .then(result => {
            console.log("From database ", result);
            Task.remove({ parent_id: id })
                .exec()
                .then(result2 => {
                    console.log("From database ", result2);
                    res.status(200).json(result);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;