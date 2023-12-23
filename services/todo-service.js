import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'todos'

export const todoService = {
    query,
    getById,
    save,
    remove,
    getEmptyTodo
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
        return storageService.put(STORAGE_KEY, todo)
    } else {
        // when switching to backend - remove the next line
        todo.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, todo)
    }
}

function getEmptyTodo() {
    return {
        todoTitle: '',
        isDone: false,
    }
}

// TEST DATA
// storageService.post(STORAGE_KEY, {todoTitle: 'Go shopping',  isDone: false}).then(x => console.log(x))



