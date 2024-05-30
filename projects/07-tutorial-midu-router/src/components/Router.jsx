import {useEffect, useState} from "react";
import {NAVIGATION_EVENT} from "../consts.js";

export function Router({routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1>}) {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(() => {
        const onLocationChange = () => {
            // window.location.captureEvents()
            setCurrentPath(window.location.pathname);
        }

        window.addEventListener(NAVIGATION_EVENT.PUSHSTATE, onLocationChange);
        window.addEventListener(NAVIGATION_EVENT.POPSTATE, onLocationChange);

        return () => {
            window.removeEventListener(NAVIGATION_EVENT.PUSHSTATE, onLocationChange);
            window.removeEventListener(NAVIGATION_EVENT.POPSTATE, onLocationChange);
        };
    }, []);

    const Component = routes.find(({path}) => path === currentPath)?.component;

    return Component ? <Component/> : <DefaultComponent/>;
}
