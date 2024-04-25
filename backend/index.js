const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('./db')

// middlewares
app.use(cors())
app.use(express.json())

// ------ Routes--------
// Create a todo
app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description])
        res.json(newTodo.rows[0])
    } catch (err) {
        console.error(err.message) 
        res.json({error: err.message}) 
    }
})

// Get all todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows)
    } catch(err) {
        res.json({error: err.message})
    }
})

// Get a todo
app.get("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params
        const todo = await pool.query("SELECT * FROM todo WHERE id = $1", [id])
        res.json(todo.rows[0])
    } catch(err) {
        res.json({error: err.message})
    }
})

// Update a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params
        const { description } = req.body
        const updatedTodo = await pool.query("Update todo SET description = $1 WHERE id = $2 RETURNING *", [description, id])
        res.json({updatedTodo: updatedTodo.rows[0]})
    } catch(err) {
        res.json({error: err.message})
    }
})

// Delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params
        const deletedTodo = await pool.query("DELETE FROM todo WHERE id = $1 RETURNING *", [id])
        res.json({deletedTodo: deletedTodo.rows[0]})
    } catch(err) {
        res.json({error: err.message})
    }
})

app.listen(5000, () => {
    console.log("Server is now running on port 5000")
})

