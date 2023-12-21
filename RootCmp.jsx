const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM
const { Provider } = ReactRedux



import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'

import { HomePage } from './pages/HomePage.jsx'
// import { About } from './pages/About.jsx'
// import { TodoApp } from './pages/TodoApp.jsx'
import { store } from './store/store.js'



export class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <section className="main-layout app">
                        <AppHeader />
                        <main>
                            <Routes>
                                <Route element={<HomePage />} path="/" />
                                {/* <Route element={<About/>} path="/about" />
                                <Route element={<TodoApp />} path="/todo" /> */}
                            </Routes>
                        </main>
                        <AppFooter />
                    </section>
                </Router>
            </Provider>
        )
    }
}
