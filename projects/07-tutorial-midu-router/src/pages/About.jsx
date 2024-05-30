import {Link} from "../components/Link.jsx";

export default function AboutPage() {

    return (
        <>
            <h1>About page</h1>
            <img
                src="https://scontent.fsof11-1.fna.fbcdn.net/v/t1.18169-9/21314692_1603573789705020_758011882867740614_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=j0j_rl5K5lIQ7kNvgE5qgjy&_nc_ht=scontent.fsof11-1.fna&oh=00_AYA8omIceTPvocigRSetk6ZCfBK8nmAde6sa-u5Zp-O7Dw&oe=667D33BD"
                alt="Profile picture of me"/>
            <p>Hi, my name is Hernan Sanchez and I'm creating a React Router clone following the tutorial by
                @midudev</p>
            <Link to={'/'}>Go Home</Link>
        </>
    )
}
