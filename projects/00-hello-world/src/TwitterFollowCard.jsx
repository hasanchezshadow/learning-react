import {useState} from "react";

export function TwitterFollowCard({userName, /*name*/ children, /*formatUsername*/ initialIsFollowing}) {
    // render() {
    //     let {userName, /*name*/ children, /*formatUsername*/} = this.props;

        const [isFollowing, setIsFollowing] = useState(initialIsFollowing);

        const text = isFollowing ? 'Following' : 'Follow';
        const buttonClassName = isFollowing ? 'tw-followCard-button is-following' : 'tw-followCard-button';

        const handleClick = () => {
            setIsFollowing(!isFollowing);
        }

        return (
            <article className={'tw-followCard'}>
                <header className={'tw-followCard-header'}>
                    <img className={'tw-followCard-avatar'} alt={'midudev avatar'}
                         src={`https://unavatar.io/twitter/${userName}`}/>
                    <div className={'tw-followCard-info'}>
                        {/*<strong>{name}</strong>*/}
                        <strong>{children}</strong>
                        {/*<span className={'tw-followCard-infoUserName'}>{formatUsername(userName)}</span>*/}
                        <span className={'tw-followCard-infoUserName'}>@{userName}</span>
                    </div>
                </header>
                <aside>
                    <button className={buttonClassName} onClick={handleClick}>
                        <span className={'tw-followCard-text'}>{text}</span>
                        <span className={'tw-followCard-stopFollow'}>Stop following</span>
                    </button>
                </aside>
            </article>
        );
    // }
}

// TwitterFollowCard.propTypes = {
//     userName: PropTypes.string,
//     // name: PropTypes.string,
//     children: PropTypes.string,
//     // formatUsername: PropTypes.func,
// }
