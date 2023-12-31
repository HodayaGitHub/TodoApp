import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'todos'

export const todoService = {
    query,
    getById,
    save,
    remove,
    getEmptyTodo, 
    getFinishedTodos,
}


function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(todoId) {
    return storageService.get(STORAGE_KEY, todoId)
}

function remove(todoId) {
    return storageService.remove(STORAGE_KEY, todoId)
}

function save(todo) {
    if (todo._id) {
        return storageService.put(STORAGE_KEY, todo).then((savedTodo) => {
            userService.addActivity('Updated', savedTodo.todoTitle)
            return savedTodo
        })
    } else {
        todo.isDone = true
        todo.createdAt = Date.now()

        // when switching to backend - remove the next line

        todo.owner = userService.getLoggedinUser()
        // return storageService.post(STORAGE_KEY, todo)

        return storageService.post(STORAGE_KEY, todo).then((savedTodo) => {
            userService.addActivity('Added', savedTodo.todoTitle)
            return savedTodo
        })

    }
}

function getFinishedTodos(todos) {
    const doneTodo = todos.reduce((acc, todo) => {
        if (todo.isDone) acc++
        return acc
    }, 0)

    return todos.length === 0 ? 0 : (doneTodo / todos.length) * 100
}

function getEmptyTodo() {
    return {
        todoTitle: '',
        isDone: false,
    }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {todoTitle: 'Go shopping',  isDone: false}).then(x => console.log(x))



