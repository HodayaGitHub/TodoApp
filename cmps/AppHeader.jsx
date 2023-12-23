import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { userService } from '../services/user.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { SET_USER } from '../store/store.js'

const { useState } = React
const { useSelector, useDispatch } = ReactRedux
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter

export function AppHeader() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(storeState => storeState.loggedinUser)

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
        dispatch({ type: SET_USER, user })
        navigate('/')
    }


    const footerStyle = {
        color: user.txtColor,
        backgroundColor: user.bgColor,
    }

    return (
        <header className="app-header full main-layout" style={footerStyle}>
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
