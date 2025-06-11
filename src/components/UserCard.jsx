import React, { useState }  from 'react';

import style from './UserCard.module.css';

import * as Dialog from '@radix-ui/react-dialog';
import { UserUpdateDialog } from '../dialogs/UserUpdateDialog';

import { IconContext } from "react-icons";
import { IoPencil, IoTrash } from "react-icons/io5";

import loadingSpinner from '../assets/spinner.gif'

export function UserCard (props) {
    const [open, setOpen] = useState(false)

    const { user, onDelete, isLoading, handleUsersUpdate } = props;
    
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
                    <Dialog.Root open={open} onOpenChange={setOpen}>
                        <Dialog.Trigger asChild>
                            <button>
                                <IoPencil 
                                    title={'Update'}
                                />
                            </button>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                            <UserUpdateDialog 
                                user={user} 
                                setOpen={setOpen} 
                                handleUsersUpdate={handleUsersUpdate} 
                            />
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
