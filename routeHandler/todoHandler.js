const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../schemas/todoSchema');
const Todo = new mongoose.model('Todo', todoSchema);

// get all the todos
router.get('/', async (req, res) => {

});

// get a todo by id
router.get('/:id', async (req, res) => {

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

});

// update a todo by id
router.put('/:id', async (req, res) => {

});

// delete a todo by id
router.delete('/:id', async (req, res) => {

});

// export the router
module.exports = router;