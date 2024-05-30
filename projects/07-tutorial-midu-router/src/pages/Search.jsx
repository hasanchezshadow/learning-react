import {useEffect} from "react";

export default function SearchPage ({ routeParams }) {
    useEffect(() => {
        document.title = `You have searched ${routeParams.query}`
    }, [])

    return (
        <h1>You have searched {routeParams.query}</h1>
    )
}
