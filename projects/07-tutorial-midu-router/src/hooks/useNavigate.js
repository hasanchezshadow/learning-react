import {NAVIGATION_EVENT} from "../utils/consts.js";


export function useNavigate() {
    function navigate(href) {
        window.history.pushState({}, '', href);
        // Creating personalized event
        const navigationEvent = new Event(NAVIGATION_EVENT.PUSHSTATE);
        window.dispatchEvent(navigationEvent);
    }

    return {navigate}
}
