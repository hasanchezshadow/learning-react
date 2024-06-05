import {useEffect, useState, Children} from "react";
import {NAVIGATION_EVENT} from "../consts.js";

import {match} from "path-to-regexp";
import {getCurrentPath} from "../utils/utils.js";

export function Router({children, routes = [], defaultComponent: DefaultComponent = () => <h1>404</h1>}) {
    const [currentPath, setCurrentPath] = useState(getCurrentPath());

    useEffect(() => {
        const onLocationChange = () => {
            // window.location.captureEvents()
            setCurrentPath(getCurrentPath());
        }

        window.addEventListener(NAVIGATION_EVENT.PUSHSTATE, onLocationChange);
        window.addEventListener(NAVIGATION_EVENT.POPSTATE, onLocationChange);

        return () => {
            window.removeEventListener(NAVIGATION_EVENT.PUSHSTATE, onLocationChange);
            window.removeEventListener(NAVIGATION_EVENT.POPSTATE, onLocationChange);
        };
    }, []);

    let routeParams = {};

    const routesFromChildren =  Children.map(children, ({props, type}) => {
       const {name} = type;
       const isRoute = name === 'Route';

       return isRoute ? props : null;
    });
    const routesToUse = routes.concat(routesFromChildren).filter(Boolean);

    const Component = routesToUse.find(({path}) => {
        if (path === currentPath) return true;

        // Using path-to-regex
        // To detect dynamic routes like
        // /search/:query <- :query is the dynamic route
        const matcherUrl = match(path, {decode: decodeURIComponent});
        const matched = matcherUrl(currentPath);
        if (!matched) return false;

        // Saving the dynamic url params
        // that we have extracted with path-to-regex
        // For example, if the route is /sear/:query
        // and the url is /search/javascript
        // matched.params.query === javascript
        routeParams = matched.params;
        return true;
    })?.component;

    return Component ? <Component routeParams={routeParams}/> : <DefaultComponent routeParams={routeParams}/>;
}
