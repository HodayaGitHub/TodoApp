import { userService } from "../services/user.service.js"
const { createStore } = Redux

/// user
export const SET_USER = 'SET_USER'

const initialState = {
    todos: [],
    isLoading: false,
    loggedinUser: userService.getLoggedinUser(),
}

function appReducer(state = initialState, action = {}) {
    switch (action.type) {

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