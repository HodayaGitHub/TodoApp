import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

const { useSelector, useDispatch } = ReactRedux
const { useEffect } = React


import { AddTodo } from '../cmps/AddTodo.jsx'
import { TodoList } from '../cmps/TodoList.jsx'
import { todoService } from '../services/todo-service.js'
import { TodoFilter } from '../cmps/TodoFilter.jsx'
import { ADD_TODO, REMOVE_TODO, SET_TODOS, UPDATE_TODO, SET_FILTER_BY } from '../store/reducers/todo.reducer.js'


export function TodoApp() {
    const dispatch = useDispatch()

    const todos = useSelector(storeState => storeState.todoModule.todos)
    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const filterBy = useSelector((storeState) => storeState.todoModule.filterBy)


    useEffect(() => {
        todoService.query(filterBy)
            .then(todos => {
                dispatch({ type: SET_TODOS, todos })
            })
            .catch(err => {
                console.error('Cannot load todos:', err)
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

    // todos filtring 
    function setFilter(ev) {
        const action = {
            type: SET_FILTER_BY,
            val: ev.target.value,
        }
        dispatch(action)
    }

    function todosToShow() {
        console.log('todosfilterbyall', todos)
        if (filterBy === 'all') return todos
        return todos.filter((todo) => (filterBy === 'done' ? todo.isDone : !todo.isDone))
    }


    return (
        <React.Fragment>
            <AddTodo onAddTodo={onAddTodo} />
            {!todos.length && <h1> no todos to show..</h1>}
            
            {todos.length > 0 &&
                <React.Fragment>
                    <TodoFilter onSetFilter={setFilter} />
                    
                    <TodoList
                        todos={todosToShow()}
                        user={user}
                        onRemoveTodo={onRemoveTodo}
                        onEditTodo={onEditTodo}
                    />

                </React.Fragment>

            }
        </React.Fragment>
    )
}