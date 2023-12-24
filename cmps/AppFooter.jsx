import { todoService } from '../services/todo-service.js'

const { useSelector } = ReactRedux

export function AppFooter() {

    const user = useSelector(storeState => storeState.userModule.loggedinUser)
    const todos = useSelector(storeState => storeState.todoModule.todos)


    function footerStyle() {
        if (!user || !todos) return
        return {
            color: user.txtColor,
            backgroundColor: user.bgColor,
        }
    }


    return (
        <footer style={footerStyle()}>
            {user && <h3>You have finished {todoService.getFinishedTodos(todos).toFixed(2)}% of the Todos</h3>}
            <h1>footer</h1>
        </footer>
    )
}