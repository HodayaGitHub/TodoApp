const { useSelector } = ReactRedux

export function AppFooter() {
    const user = useSelector(storeState => storeState.userModule.loggedinUser)


    function footerStyle() {
        if (!user) return
        return {
            color: user.txtColor,
            backgroundColor: user.bgColor ,
        }
    }

    return (
        <footer style={footerStyle()}>
            <h1>footer</h1>
        </footer>
    )
}