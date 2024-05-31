import './App.css'
import AboutPage from "./pages/About.jsx";
import HomePage from "./pages/Home.jsx";
import Page404 from "./pages/404.jsx";
import SearchPage from "./pages/Search.jsx";

import {Router} from "./components/Router.jsx";
import {Route} from "./components/Route.jsx";

const routes = [
    {
        path: '/search/:query',
        component: SearchPage
    }
];

function App() {

    return (
        <main>
            <Router routes={routes} defaultComponent={Page404}>
                <Route path={'/'} component={HomePage}/>
                <Route path={'/about'} component={AboutPage}/>
            </Router>
        </main>
  )
}

export default App
