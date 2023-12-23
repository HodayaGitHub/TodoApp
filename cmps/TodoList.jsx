const { Link } = ReactRouterDOM
const { useState } = React


export function TodoList({ todos, onRemoveTodo, onEditTodo }) {
    const [editableTodoId, setEditableTodoId] = useState(null)
    const [editedTodoTitle, setEditedTodoTitle] = useState('')

    function handleEditClick(todoId, todoTitle) {
        setEditableTodoId(todoId)
        setEditedTodoTitle(todoTitle)
        console.log('todoTitle', todoTitle)
    }

    function handleSaveClick(todo) {
        setEditableTodoId(null)
        onEditTodo(todo, editedTodoTitle)
    }

    function handleInputChange(event) {
        setEditedTodoTitle(event.target.value)
    }

    return (
        <ul className="todo-list">
            {todos.map(todo =>
                <li key={todo._id}>
                    <section>
                        {editableTodoId === todo._id ? (
                            <div>
                                <textarea

                                    value={editedTodoTitle}
                                    onChange={handleInputChange}
                                    rows={Math.min(5, Math.ceil(todo.todoTitle.length / 30))}
                                />
                                <button onClick={() => handleSaveClick(todo)}>Save</button>
                            </div>
                        ) : (
                            <div>
                                <h1>{todo.todoTitle}</h1>
                                <button><Link to={`/todo/${todo._id}`}>Details</Link></button>
                                <button onClick={() => onRemoveTodo(todo._id)}>X</button>
                                <button onClick={() => handleEditClick(todo._id, todo.todoTitle)}>Edit</button>
                            </div>
                        )}
                    </section>
                </li>
            )}
        </ul>
    );
}