import {Link} from "../components/Link.jsx";

// todo Move i18n to a separated file
const i18n = {
    es: {
        title: 'Sobre nosotros',
        description: 'Hola, me llamo Hernan Sanchez y estoy creando un clon de React Router siguiendo el tutorial de @midudev',
        linkText: 'Ir al Home'
    },
    en: {
        title: 'About us',
        description: 'Hi, my name is Hernan Sanchez and I\'m creating a React Router clone following the tutorial by @midudev',
        linkText: 'Go Home'
    }
}

const useI18n = (lang) => {
    return i18n[lang] || i18n.en;
}

export default function AboutPage({routeParams}) {
    const {lang} = routeParams;
    const {description, title, linkText} = useI18n(lang);

    return (
        <>
            <h1>{title}</h1>
            <img
                src="https://scontent.fsof11-1.fna.fbcdn.net/v/t1.18169-9/21314692_1603573789705020_758011882867740614_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=j0j_rl5K5lIQ7kNvgE5qgjy&_nc_ht=scontent.fsof11-1.fna&oh=00_AYA8omIceTPvocigRSetk6ZCfBK8nmAde6sa-u5Zp-O7Dw&oe=667D33BD"
                alt="Profile picture of me"/>
            <p>{description}</p>
            <Link to={'/'}>{linkText}</Link>
        </>
    )
}
