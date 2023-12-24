import { storageService } from './async-storage.service.js'

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    save,
    getById,
    getLoggedinUser,
    updateBalance,
    getEmptyCredentials,
    query,
    addActivity,
}


function getById(userId) {
    return storageService.get(STORAGE_KEY, userId)
}

function save(user) {
    if (user._id) {
        return storageService.put(STORAGE_KEY, user)
    } else {
        return storageService.post(STORAGE_KEY, user)
    }
}

function query() {
    return storageService.query(STORAGE_KEY)
}


function getEmptyUser() {
    return {
        fullname: '',
        isDone: false,
    }
}

function login({ username, password }) {
    return storageService.query(STORAGE_KEY)
        .then(users => {
            const user = users.find(user => user.username === username)
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname, balance, activities, bgColor, txtColor }) {
    const user = { username, password, fullname, balance, activities, bgColor, txtColor }
    return storageService.post(STORAGE_KEY, user)
        .then(_setLoggedinUser)
}


function updateBalance(diff) {
    const loggedInUserId = getLoggedinUser()._id
    return userService.getById(loggedInUserId)
        .then(user => {
            if (user.balance + diff < 0) return Promise.reject('No credit')
            user.balance += diff
            return storageService.put(STORAGE_KEY, user)
        })
        .then(user => {
            _setLoggedinUser(user)
            return user.balance
        })
}

function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
    return Promise.resolve()
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = {
        _id: user._id,
        fullname: user.fullname,
        balance: user.balance,
        activities: user.activities,
        bgColor: user.bgColor,
        txtColor: user.txtColor,
    }

    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}


function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}


function addActivity(type, todoId) {
    const activity = {
        txt: `${type} a Todo with id : ${todoId}`,
        at: Date.now()
    }
    const loggedinUserId = getLoggedinUser()._id
    return getById(loggedinUserId)
        .then(user => {
            if (!user.activities) user.activities = []
            user.activities.push(activity)
            return user
        })
        .then(userToUpdate => {
            return storageService.put(STORAGE_KEY, userToUpdate)
                .then((savedUser) => {
                    _setLoggedinUser(savedUser)
                    return savedUser
                })
        })
}



// Test Data
// userService.signup({
//     username: 'muki',
//     password: 'muki1',
//     fullname: 'Muki Ja',
//     balance: 10000,
//     activities: [{ txt: 'Added a Todo', at: 1523873242735 }],
//     bgColor: '#FF0000',
//     txtColor: '#0000FF',
// })
// userService.login({username: 'muki', password: 'muki1'})



