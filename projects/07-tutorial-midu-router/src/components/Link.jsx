import {BUTTONS, NAVIGATION_EVENT} from "../utils/consts.js";

function navigate(href) {
    window.history.pushState({}, '', href);
    // Creating personalized event
    const navigationEvent = new Event(NAVIGATION_EVENT.PUSHSTATE);
    window.dispatchEvent(navigationEvent);
}

export function Link({target, to, ...props}) {
    const handleClick = (e) => {
        const isMainEvent = e.button === BUTTONS.primary; // primary click
        const isModifiedEvent = e.metaKey || e.altKey || e.ctrlKey || e.shiftKey;
        const isManageableEvent = target === undefined || target === '_self';

        if (isMainEvent && isManageableEvent && !isModifiedEvent) {
            e.preventDefault();
            navigate(to); // SPA navigation
            window.scrollTo(0, 0);
        }
    }

    return (
        <>
            <a onClick={handleClick} target={target} href={to} {...props} />
        </>
    )
}
