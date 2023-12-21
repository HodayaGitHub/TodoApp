import { userService } from "../services/user.service.js"
const { createStore } = Redux

// Todos
export const SET_TODOS = 'SET_TODOS'
export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'

/// user
export const SET_USER = 'SET_USER'

const initialState = {
    todos: [],
    isLoading: false,
    loggedinUser: userService.getLoggedinUser(),
}

function appReducer(state = initialState, action = {}) {
    let todos

    switch (action.type) {
        case SET_TODOS:
            return { ...state, todos: action.todos }

        case ADD_TODO:
            todos = [...state.todos, action.todo]
            return { ...state, todos }

        case REMOVE_TODO:
            todos = state.todos.filter(todo => todo._id !== action.todoId)
            return { ...state, todos }

        case UPDATE_TODO:
            todos = state.todos.map(todo => todo._id === action.todo._id ? action.todo : todo)
            return { ...state, todos }


        // user
        case SET_USER:
            return { ...state, loggedinUser: action.user }

        default:
            return state
    }

}

export const store = createStore(appReducer)

window.gStore = store

// store.subscribe(() => {
//     console.log('Current state is:', store.getState())
// })