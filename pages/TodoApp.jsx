import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

const { Link } = ReactRouterDOM

const { useSelector, useDispatch } = ReactRedux
const { useEffect } = React


import { AddTodo } from '../cmps/AddTodo.jsx';
import { TodoList } from '../cmps/TodoList.jsx';
import { todoService } from '../services/todo-service.js'
import { ADD_TODO, REMOVE_TODO, SET_TODOS, UPDATE_TODO } from '../store/store.js'

export function TodoApp() {
    const dispatch = useDispatch()

    const todos = useSelector(storeState => storeState.todos)

    useEffect(() => {
        todoService.query()
            .then(todos => {
                dispatch({ type: SET_TODOS, todos })
            })
    }, [])

    function onAddTodo(todoToSave) {
        todoService.save(todoToSave)
            .then((savedTodo) => {
                showSuccessMsg(`Todo added (id: ${savedTodo._id})`)
                dispatch({ type: ADD_TODO, todo: savedTodo })
            })
            .catch(err => {
                console.log('Cannot add todo', err)
                showErrorMsg('Cannot add todo')
            })
    }

    function onRemoveTodo(todoId) {
        todoService.remove(todoId)
            .then(() => {
                dispatch({ type: REMOVE_TODO, todoId })

            })
    }


    function onEditTodo(todo, newTodoTitle) {
        // const newTodoTitle = prompt('set new title')
        const todoTosave = { ...todo, todoTitle: newTodoTitle }

        todoService.save(todoTosave)
            .then((savedTodo) => {
                dispatch({ type: UPDATE_TODO, todo: savedTodo })
                showSuccessMsg(`Todo updated to: $${savedTodo.todoTitle}`)
            })
            .catch(err => {
                console.log('Cannot update todo', err)
                showErrorMsg('Cannot update todo')
            })
    }


if (!todos.length) return <h1> no todos to show..</h1>
return (
    <React.Fragment>
        <AddTodo onAddTodo={onAddTodo} />
        <TodoList
            todos={todos}
            onRemoveTodo={onRemoveTodo}
            onEditTodo={onEditTodo} />

    </React.Fragment>
)

}