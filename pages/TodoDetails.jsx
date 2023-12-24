const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM
const { useSelector } = ReactRedux
import { todoService } from '../services/todo-service.js'

export function TodoDetails() {
    const params = useParams()
    const navigate = useNavigate()

    const [currTodo, setCurrTodo] = useState(null)

    useEffect(() => {
        const { id } = params
        todoService.getById(id)
            .then(todo => {
                if (!todo) return navigate('/todo')
                setCurrTodo(todo)
            })
            .catch(err => {
                console.log('Had issues loading todo')
            })
    }, [])

    if (!currTodo) return <h4>loading</h4>
    const { _id, todoTitle, isDone } = currTodo
    return (
        <div className="todo-details flex scale-in-hor-right">
            <div className="todo-data-container">
                <h1>Id {_id}</h1>
                <h1>To Do: {todoTitle}</h1>
                <h1>is done? {isDone ? 'yes' : 'no'}</h1>
                <button className="back-btn" onClick={() => navigate('/todo')}>
                    Back to todos
                </button>
            </div>
        </div>
    )
}
