const { Link } = ReactRouterDOM

export function TodoPreview({ todo, onUpdateTodo, onRemove }) {
  function onToggleDone() {
    const newTodo = { ...todo, isDone: !todo.isDone }
    onUpdateTodo(newTodo)
  }

  return (
    <li className={`flex space-around align-center ${todo.isDone ? 'done' : ''}`}>
      <h4 onClick={() => onToggleDone()} title="Done/Undone">
        {todo.name}
      </h4>
      <button onClick={() => { onRemove(todo._id) }}>x</button>
      <Link to={`/todo/${todo._id}`}>Details</Link>
    </li>
  )
}
