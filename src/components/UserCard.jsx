import style from './UserCard.module.css';

export function UserCard (props) {
    const { user } = props;

    return (
        <div className={style.userCard}>
            <div className={style.leftItems}>
                <span><b>Name:</b> {user.name}</span>
                <span><b>Email:</b> {user.email}</span>
                <span><b>Role:</b> {user.role}</span>
            </div>
            <div className={style.rightItems}></div>
        </div>
    )
}
