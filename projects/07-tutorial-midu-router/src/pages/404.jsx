import {Link} from "../components/Link.jsx";

export default function Page404() {
    return (
        <>
            <div>
                <h1>This is NOT fine</h1>
                <img src='https://midu.dev/images/this-is-fine-404.gif' alt='Gif of the dog from This is Fine burning alive' />
            </div>
            <Link to='/'>Back to home</Link>
        </>
    );
}
