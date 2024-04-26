import './App.css';
import {TwitterFollowCard} from "./TwitterFollowCard.jsx";

export function App() {
    // const format = (username) => `@${username}`;
    const users = [
        {
            userName: 'midudev',
            name: 'Miguel Angel Durán',
            isFollowing: true
        },
        {
            userName: 'pheralb',
            name: 'Pablo Hernández',
            isFollowing: false
        },
        {
            userName: 'elonmusk',
            name: 'Elon Musk',
            isFollowing: false
        },
        {
            userName: 'vxnder',
            name: 'Vanderhart',
            isFollowing: false
        },
        {
            userName: 'PacoHdezs',
            name: 'Paco Hdez',
            isFollowing: true
        },
        {
            userName: 'TMChein',
            name: 'Tomas Chein',
            isFollowing: false
        },
    ];
    return (
        <section className={'app'}>
            {
                users.map(({userName, name, isFollowing}) =>
                    (
                        <TwitterFollowCard
                            key={userName}
                            userName={userName}
                            initialIsFollowing={isFollowing}
                        >
                            {name}
                        </TwitterFollowCard>
                    )
                )
            }
        </section>
    );
}
