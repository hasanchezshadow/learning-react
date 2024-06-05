import {describe, it, expect, beforeEach, vi} from "vitest";
import {render, screen, cleanup, fireEvent, waitFor} from "@testing-library/react";
import {Router} from "../components/Router.jsx";
import {getCurrentPath} from "../utils/utils.js";
import {Route} from "../components/Route.jsx";
import {Link} from "../components/Link.jsx";

vi.mock('../utils/utils.js', () => ({
    getCurrentPath: vi.fn()
}));

describe('Router', () => {
    beforeEach(() => {
        cleanup();
        vi.clearAllMocks();
    });

    it ('should render without problems',  () => {
        render(<Router routes={[]}/>);
        expect(true).toBeTruthy();
    });

    it ('should render 404 if no routes match',  () => {
        render(<Router routes={[]} defaultComponent={() => <h1>404</h1>}/>);
        expect(screen.getByText('404')).toBeDefined();
    });

    it ('should render the component oh the first routes that matches',  () => {
        getCurrentPath.mockReturnValue('/about');
        const routes =  [
            {
                path: '/',
                component: () => <h1>Home</h1>
            },
            {
                path: '/about',
                component: () => <h1>About</h1>
            }
        ];

        render(<Router routes={routes} defaultComponent={() => <h1>404</h1>}/>);
        expect(screen.getByText('About')).toBeDefined();
    });

    it ('should navigate using Links',  async () => {
        getCurrentPath.mockReturnValueOnce('/');
        render(
            <Router defaultComponent={() => <h1>404</h1>}>
                <Route path={'/'} component={() =>
                    <>
                        <h1>Home</h1>
                        <Link to={'/about'}>Go to About</Link>
                    </>
                }/>
                <Route path={'/about'} component={() => <h1>About</h1>}/>
            </Router>
        );
        expect(screen.getByText('Home')).toBeDefined();

        // // Click on the link
        // screen.getByText('Go to About').click();
        //
        // // Check if the new route is rendered
        // const aboutElement = await waitFor(() => screen.findByText('About'))
        // expect(aboutElement).toBeDefined();

        // Click on the link
        const link = screen.getByText('Go to About');
        fireEvent.click(link);

        // Check if the new route is rendered
        const aboutElement = await screen.findByText('About');
        expect(aboutElement).toBeDefined();
    });
})
