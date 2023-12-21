import { utilService } from "../services/util.service.js"

const { Link } = ReactRouterDOM
// const { useSelector, useDispatch } = ReactRedux
const { useState } = React


export function TodoList({ todos, onRemoveTodo, onEditTodo }) {
    const [editableTodoId, setEditableTodoId] = useState(null)

    const handleEditClick = (todoId) => {
        setEditableTodoId(todoId)
    }

    const handleSaveClick = () => {
        setEditableTodoId(null)
    }

    const handleDebouncedEdit = utilService.debounce((todo, newTodoTitle) => {
        onEditTodo(todo, newTodoTitle)
    }, 300)

    return (
        <ul className="todo-list">
            {todos.map(todo =>
                <li key={todo._id}>
                    <section>
                        {editableTodoId === todo._id ? (
                            <div>
                                <textarea
                                    value={todo.todoTitle}
                                    onChange={(e) => handleDebouncedEdit(todo, e.target.value)}
                                    // rows={Math.min(5, Math.ceil(todo.todoTitle.length / 30))}
                                />
                                <button onClick={handleSaveClick}>Save</button>
                            </div>
                        ) : (
                            <div>
                                <h1>{todo.todoTitle}</h1>
                                <button><Link to={`/todo/${todo._id}`}>Details</Link></button>
                                <button onClick={() => onRemoveTodo(todo._id)}>X</button>
                                <button onClick={() => handleEditClick(todo._id)}>Edit</button>
                            </div>
                        )}
                    </section>
                </li>
            )}
        </ul>
    );
}