import {Link} from "../components/Link.jsx";

export default function HomePage() {

    return (
        <>
            <h1>Home page</h1>
            <p>This is a page to create a React Router from scratch</p>
            <Link to={'/about'}>About us</Link>
        </>
    )
}
