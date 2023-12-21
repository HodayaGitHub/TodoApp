import { todoService } from "../services/todo-service.js"
const { useState } = React

export function AddTodo({ onAddTodo}) {
    const initialTodo = todoService.getEmptyTodo()
    const [newTodo, setNewTodo] = useState(initialTodo)

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        setNewTodo((prevTodo) => ({ ...prevTodo, [field]: value }))
    }

    function handleAddTodo(ev) {
        ev.preventDefault()
        onAddTodo(newTodo)
        setNewTodo(initialTodo)
    }

    const { todoTitle } = newTodo

    return (
        <section>
            <form onSubmit={handleAddTodo}>
                <label htmlFor="todo">Todo</label>
                <input
                    onChange={handleChange}
                    value={todoTitle}
                    type="text"
                    name="todoTitle"
                    id="todoTitle"
                />
                <button disabled={!todoTitle}>Save</button>
            </form>
        </section>
    )
}

























{/* 
                <label htmlFor="maxSpeed">Max Speed</label>
                <input onChange={handleChange} value={maxSpeed} type="number" name="maxSpeed" id="maxSpeed" />
                <button disabled={!vendor}>Save</button> */}