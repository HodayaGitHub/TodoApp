import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { userService } from '../services/user.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { SET_USER } from '../store/reducers/user.reducer.js'

const { useSelector, useDispatch } = ReactRedux
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter

export function AppHeader() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const todos = useSelector(storeState => storeState.todoModule.todos)
    console.log(user)


    function onLogout() {
        userService.logout()
            .then(() => {
                onSetUser(null)
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }



    function onSetUser(user) {
        if (!user) return
        dispatch({ type: SET_USER, user })
        navigate('/')
    }


    function headerStyle(){
        if(!user) return 
        return {
            color: user.txtColor || 'black',
            backgroundColor: user.bgColor || 'white',
        }
    }

    function getFinishedTodos() {
        const doneTodo = todos.reduce((acc, todo) => {
            if (todo.isDone) acc++
            return acc
        }, 0)

        return todos.length === 0 ? 0 : (doneTodo / todos.length) * 100
    }

    return (
        <header className="app-header full main-layout" style={headerStyle()}>
            <section className="header-container">
                <h1>React Todo App</h1>
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/user" >User</NavLink>

                </nav>
            </section>
            {user ? (
                < section >
                    <h3>You have finished {getFinishedTodos().toFixed(2)}% of the Todos</h3>

                    <span to={`/user/${user._id}`}>Hello {user.fullname}
                        <span>${user.balance}</span>
                    </span>
                    <button onClick={onLogout}>Logout</button>
                </ section >
            ) : (
                <section>
                    <LoginSignup onSetUser={onSetUser} />
                </section>
            )}
            <UserMsg />
        </header>
    )
}
