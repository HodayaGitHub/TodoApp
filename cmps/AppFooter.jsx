const { useSelector } = ReactRedux

export function AppFooter() {
    const user = useSelector(storeState => storeState.userModule.loggedinUser)


    const footerStyle = {
        color: user.txtColor,
        backgroundColor: user.bgColor,
    }

    return (
        <footer style={footerStyle}>
            <h1>footer</h1>
        </footer>
    )
}