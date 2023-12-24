const { Link } = ReactRouterDOM
const { useState } = React

export function TodoList({ todos, user, onRemoveTodo, onEditTodo }) {
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

    const todoStyle = {
        color: user.txtColor,
        backgroundColor: user.bgColor,
    }

    console.log(todos)
    return (
        <ul className="todo-list">
            {todos.map(todo =>
                <li style={todoStyle} key={todo._id}>
                    <section>
                        {editableTodoId === todo._id ? (
                            <div className="todo-edit" >
                                <span className="text-area">
                                    <textarea
                                        autoFocus
                                        value={editedTodoTitle}
                                        onChange={handleInputChange}
                                    // rows={Math.min(5, Math.ceil(todo.todoTitle.length / 30))}
                                    />
                                </span>
                                <span>
                                    <button onClick={() => handleSaveClick(todo)}>Save</button>
                                </span>
                            </div>
                        ) : (
                            <div className="todo-item" >
                                <span>
                                    <h1 onClick={() => handleEditClick(todo._id, todo.todoTitle)}>{todo.todoTitle}</h1>
                                </span>
                                <span>
                                    <button><Link to={`/todo/${todo._id}`}>Details</Link></button>
                                    <button onClick={() => onRemoveTodo(todo._id)}>X</button>
                                    <button onClick={() => handleEditClick(todo._id, todo.todoTitle)}>Edit</button>
                                </span>
                            </div>
                        )}
                    </section>
                </li>
            )}
        </ul>
    )
}