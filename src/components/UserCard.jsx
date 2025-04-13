import style from './UserCard.module.css';

import * as Dialog from '@radix-ui/react-dialog';
import { UserUpdateDialog } from '../dialogs/UserUpdateDialog';

import { IconContext } from "react-icons";
import { IoPencil, IoTrash } from "react-icons/io5";

import loadingSpinner from '../assets/spinner.gif'

export function UserCard (props) {
    const { user, onUpdate, onDelete, isLoading } = props;
  
    if (isLoading.active && isLoading.id === user.id) {
        return (
            <div className={`${style.userCard} ${style.loading}`}>
                <div className={style.loadingState}>
                    <img src={loadingSpinner} className={style.loadingSpinner}/>
                </div>
            </div>
        )
    }

    return (
        <div className={style.userCard}>
            <div className={style.leftItems}>
                <span><b>Name:</b> {user.name}</span>
                <span><b>Email:</b> {user.email}</span>
                <span><b>Role:</b> {user.role}</span>
            </div>
            <div className={style.rightItems}>
                <IconContext.Provider value={{ className: style.cardIcon }}>
                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <button>
                                <IoPencil 
                                    onClick={() => onUpdate(user.id)}
                                    title={'Update'}
                                />
                            </button>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <UserUpdateDialog />
                        </Dialog.Portal>

                    </Dialog.Root>
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
