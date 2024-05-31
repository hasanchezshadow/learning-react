import {lazy, Suspense} from "react";

import './App.css'
// import AboutPage from "./pages/About.jsx"; // Static import
// import HomePage from "./pages/Home.jsx";
import Page404 from "./pages/404.jsx";
import SearchPage from "./pages/Search.jsx";

import {Router} from "./components/Router.jsx";
import {Route} from "./components/Route.jsx";


// import('./pages/About.jsx').then(() => AboutPage); // Dynamic import
const LazyHomePage = lazy(() => import('./pages/Home.jsx')); // Lazy import
const LazyAboutPage = lazy(() => import('./pages/About.jsx')); // Lazy import

const routes = [
    {
        path: '/search/:query',
        component: SearchPage
    }
];

function App() {

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <main>
                <Router routes={routes} defaultComponent={Page404}>
                    <Route path={'/'} component={LazyHomePage}/>
                    <Route path={'/about'} component={LazyAboutPage}/>
                </Router>
            </main>
        </Suspense>
    )
}

export default App
