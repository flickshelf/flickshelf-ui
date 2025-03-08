import style from './UserCard.module.css';

export function UserCard () {
    return (
        <div className={style.userCard}>
            <div className={style.leftItems}>
                <span><b>Name:</b> Name</span>
                <span><b>Email:</b> Email</span>
                <span><b>Role:</b> User</span>
            </div>
            <div className={style.rightItems}></div>
        </div>
    )
}
