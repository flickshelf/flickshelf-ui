import style from './UserCard.module.css';

import { IconContext } from "react-icons";
import { IoPencil, IoTrash } from "react-icons/io5";


export function UserCard (props) {
    const { user, onUpdate, onDelete } = props;

    return (
        <div className={style.userCard}>
            <div className={style.leftItems}>
                <span><b>Name:</b> {user.name}</span>
                <span><b>Email:</b> {user.email}</span>
                <span><b>Role:</b> {user.role}</span>
            </div>
            <div className={style.rightItems}>
                <IconContext.Provider value={{ className: style.cardIcon }}>
                    <button>
                        <IoPencil 
                            onClick={() => onUpdate(user.id)}
                            title={'Update'}
                        />
                    </button>
                   <button>
                         <IoTrash 
                            onClick={() => onDelete(user.id)}  
                            title={'Delete'}
                        />
                   </button>
                </IconContext.Provider>
            </div>
        </div>
    )
}
