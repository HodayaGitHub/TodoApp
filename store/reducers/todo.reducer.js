export const SET_TODOS = 'SET_TODOS'
export const ADD_TODO = 'ADD_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_SEARCH_TEXT = 'SET_SEARCH_TEXT'

const initialState = {
    todos: [],
    isLoading: false,
    filterBy: 'all',
    searchText: '',
}

export function todoReducer(state = initialState, action) {
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
            todos = state.todos.map(todo => (todo._id === action.todo._id ? action.todo : todo))
            return { ...state, todos }

        case SET_FILTER_BY:
            return { ...state, filterBy: action.val }

        case SET_SEARCH_TEXT:
            return { ...state, searchText: action.text }

        // case SET_FILTER_BY:
        //     return { ...state, filterBy: { ...state.filterBy, ...action.filterBy } }

        default:
            return state
    }
}
