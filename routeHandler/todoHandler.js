const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const todoSchema = require('../schemas/todoSchema');

// Correct way to define the model
const Todo = mongoose.model('Todo', todoSchema);

// Get all todos (with status "active")
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find({ status: "active" }).select({ _id: 0, date: 0 });
        res.status(200).json({
            message: 'Todos are fetched successfully',
            data: todos
        });
    } catch (err) {
        res.status(500).json({ error: "There was an error while getting the todos" });
    }
});

// Get active todos (assuming `findActive()` is a static method in the model)
router.get('/active', async (req, res) => {
    try {
        const data = await Todo.findActive(); // Call static method directly
        res.status(200).json({
            message: 'Active todos fetched successfully',
            data: data
        });
    } catch (err) {
        res.status(500).json({ error: "There was an error while getting active todos"});
    }
});

// Get a todo by ID
router.get('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id).select({ _id: 0, date: 0 });
        if (!todo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.status(200).json({
            message: 'Todo fetched successfully',
            data: todo
        });
    } catch (err) {
        res.status(500).json({ error: "There was an error while getting the todo" });
    }
});

// Create a new todo
router.post('/', async (req, res) => {
    try {
        const newTodo = new Todo(req.body);
        await newTodo.save();
        res.status(201).json({
            message: 'Todo added successfully',
            data: newTodo
        });
    } catch (err) {
        res.status(500).json({ error: "There was an error while adding the todo" });
    }
});

// Insert multiple todos
router.post('/all', async (req, res) => {
    try {
        await Todo.insertMany(req.body);
        res.status(201).json({ message: 'Todos added successfully' });
    } catch (err) {
        res.status(500).json({ error: "There was an error while adding todos" });
    }
});

// Update a todo by ID
router.put('/:id', async (req, res) => {
    try {
        const result = await Todo.updateOne({ _id: req.params.id }, { $set: { status: "active" } });
        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: "Todo not found or already active" });
        }
        res.status(200).json({ message: 'Todo updated successfully' });
    } catch (err) {
        res.status(500).json({ error: "There was an error while updating the todo" });
    }
});

// Update a todo by ID using `findByIdAndUpdate`
router.put('/update/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            { $set: { status: "active" } },
            { new: true } // Return the updated document
        );
        if (!updatedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.status(200).json({
            message: 'Todo updated successfully',
            data: updatedTodo
        });
    } catch (err) {
        res.status(500).json({ error: "There was an error while updating the todo" });
    }
});

// Delete a todo by ID
router.delete('/:id', async (req, res) => {
    try {
        const result = await Todo.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: "There was an error while deleting the todo" });
    }
});

// Export the router
module.exports = router;
