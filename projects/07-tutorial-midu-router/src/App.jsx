import './App.css'
import AboutPage from "./pages/AboutPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import Page404 from "./pages/404.jsx";

import {Router} from "./components/Router.jsx";

const routes = [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/about',
        component: AboutPage
    }
];

function App() {

    return (
        <main>
            <Router routes={routes} defaultComponent={Page404}/>
        </main>
  )
}

export default App
