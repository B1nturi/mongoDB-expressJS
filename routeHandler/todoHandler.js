const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../schemas/todoSchema');
const Todo = new mongoose.model('Todo', todoSchema);

// get all the todos
router.get('/', async (req, res) => {
    await Todo.find({ status: "active" }).select({_id: 0, date: 0}) // find all the todos with status active
        .then((data) => {
            res.status(200).json({
                message: 'Todos are fetched successfully',
                data: data
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: "There was an error while getting the todos"
            });
        });
});

// get a todo by id
router.get('/:id', async (req, res) => {
    await Todo.find({ _id: req.params.id }).select({_id: 0, date: 0}) // find todo by id
        .then((data) => {
            res.status(200).json({
                message: 'Todo is fetched successfully',
                data: data
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: "There was an error while getting the todo"
            });
        });
});

// post a todo
router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save()
        .then(() => {
            res.status(200).json({
                message: 'Todo is added successfully',
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: "There was an error while adding the todo"
            });
        });

});

// post all todo
router.post('/all', async (req, res) => {
    Todo.insertMany(req.body)
        .then(() => {
            res.status(200).json({
                message: 'Todos are added successfully',
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: "There was an error while adding the todo"
            });
        });
});

// update a todo by id
router.put('/:id', async (req, res) => {
    await Todo.updateOne({ _id: req.params.id }, {
        $set: {
            status: "active"
        }
    })
        .then(() => {
            res.status(200).json({
                message: 'Todo is updated successfully',
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: "There was an error while updating the todo"
            });
        });
});

router.put('/update/:id', async (req, res) => {
    await Todo.findByIdAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                status: "active"
            }
        },
        {
            new: true,
            useFindAndModify: false
        })
        .then((result) => {
            console.log(result);
            res.status(200).json({
                message: 'Todo is updated successfully',
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: "There was an error while updating the todo"
            });
        });
});

// delete a todo by id
router.delete('/:id', async (req, res) => {
    await Todo.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(200).json({
                message: 'Todo is deleted successfully',
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: "There was an error while deleting the todo"
            });
        });
});

// export the router
module.exports = router;