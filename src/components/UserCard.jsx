import style from './UserCard.module.css';

import * as Dialog from '@radix-ui/react-dialog';

import { IconContext } from "react-icons";
import { IoPencil, IoTrash, IoClose } from "react-icons/io5";

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

    const userName = "2"

    const userEmail = "2"

    const userRole = "2"

    const onChangeName = () => {

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
                            <Dialog.Overlay className={style.modalOverlay} />

                            <Dialog.Content className={style.modalContent}>
                                <Dialog.Title>User Update</Dialog.Title>
                                
                                <label className={style.label}>Name</label>
                                <input 
                                    type="text" 
                                    value={userName}
                                    onChange={onChangeName}
                                    placeholder='Type your name...'
                                />

                                <label className={style.label}>Email</label>
                                <input 
                                    type="text" 
                                    value={userEmail}
                                    onChange={onChangeName}
                                    placeholder='Type your email...'
                                />

                                <label className={style.label}>Role</label>
                                <select value={userRole} onChange={onChangeName}>
                                    <option value="">Select role</option>
                                    <option value="Admin">Admin</option>
                                    <option value="User">User</option>
                                </select>

                                <button className={style.cancelButton}>Cancel</button>

                                <button className={style.updateButton}>Update</button>

                                <Dialog.Close className={style.modalCloseButton}>
                                    <IconContext.Provider value={{ className: style.modalCloseIcon }}>
                                        <IoClose title={'Close modal'} />
                                    </IconContext.Provider>
                                </Dialog.Close>
                            </Dialog.Content>
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
