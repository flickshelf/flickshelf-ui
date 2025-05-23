import React from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { IoClose } from "react-icons/io5";
import { IconContext } from "react-icons";

import style from './UserUpdateDialog.module.css';

function UserUpdateDialogComponent () {
    const userName = "User test"
    const userEmail = "testing@mail.com"
    const userRole = "User"

    const onChangeName = () => {}

    return (
        <>
            <Dialog.Overlay className={style.modalOverlay} />

            <Dialog.Content className={style.modalContent}>
                <Dialog.Title>User update</Dialog.Title>
                
                <div className={style.fieldsSection}>
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
                </div>
                <div className={style.buttonsSection}>
                    <button className={style.cancelButton}>Cancel</button>
                    <button className={style.updateButton}>Update</button>
                </div>

                <Dialog.Close className={style.modalCloseButton}>
                    <IconContext.Provider value={{ className: style.modalCloseIcon }}>
                        <IoClose title={'Close modal'} />
                    </IconContext.Provider>
                </Dialog.Close>
            </Dialog.Content>
        </>
    )
}

export const UserUpdateDialog = React.forwardRef(UserUpdateDialogComponent);
