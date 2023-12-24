const { Link } = ReactRouterDOM
const { useState, useRef, useEffect } = React

export function TodoList({ todos, user, onRemoveTodo, onEditTodo, onUpdateTodo }) {
    const [editableTodoId, setEditableTodoId] = useState(null)
    const [editedTodoTitle, setEditedTodoTitle] = useState('')
    const textareaRef = useRef(null)

    useEffect(() => {
        // Set focus to the end of the text when the textarea becomes visible
        if (editableTodoId !== null && textareaRef.current !== null) {
            textareaRef.current.focus()
            const length = editedTodoTitle.length
            textareaRef.current.setSelectionRange(length, length)
        }
    }, [editableTodoId, editedTodoTitle])

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

    function onToggleDone(todo) {
        console.log(todo)
        const newTodo = { ...todo, isDone: !todo.isDone }
        onUpdateTodo(newTodo)
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
                                        ref={textareaRef}
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
                                <span className="todo-title">
                                    <h1 onClick={() => handleEditClick(todo._id, todo.todoTitle)}>{todo.todoTitle}</h1>
                                </span>
                                <span>
                                    <button><Link to={`/todo/${todo._id}`}>Details</Link></button>
                                    <button onClick={() => onToggleDone(todo)}>✔</button>
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