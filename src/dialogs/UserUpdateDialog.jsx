import React, { useState }  from 'react';

import axios from 'axios';

import * as Dialog from '@radix-ui/react-dialog';
import { IoClose } from "react-icons/io5";
import { IconContext } from "react-icons";

import style from './UserUpdateDialog.module.css';

import spinner from '../assets/white-button-spinner.gif'

const IS_DEV_ENV = true
const baseUrl = IS_DEV_ENV ? 'http://localhost:3333' : 'https://api.flickshelf.com'

function UserUpdateDialogComponent (props) {
    const { user, setOpen, handleUsersUpdate } = props

    const [userName, setUserName] = useState(user.name)
    const [userEmail, setUserEmail] = useState(user.email)
    const [userRole, setUserRole] = useState(user.role)
    const [isLoading, setIsLoading] = useState(false)

    const onChangeName = (event) => {
        const newUserName = event.target.value
        setUserName(newUserName)
    }

    const onChangeEmail = (event) => {
        const newUserEmail = event.target.value
        setUserEmail(newUserEmail)
    }

    const onChangeRole = (event) => {
        const newUserRole = event.target.value
        setUserRole(newUserRole)
    }

    const onUpdateUser = () => {
        setIsLoading(true)

        axios.put(`${baseUrl}/users/${user.id}`, {
            userName,
            userEmail,
            userRole,
        })
            .then((res) => {
                setOpen(false)
                alert(`User ${userName} updated successfully!`)

                handleUsersUpdate()
            })
            .catch((err) => {
                console.log('Error while updating user')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

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
                        onChange={onChangeEmail}
                        placeholder='Type your email...'
                    />

                    <label className={style.label}>Role</label>
                    <select value={userRole} onChange={onChangeRole}>
                        <option value="">Select role</option>
                        <option value="ADMIN">Admin</option>
                        <option value="USER">User</option>
                    </select>
                </div>
                <div className={style.buttonsSection}>
                    <button className={style.cancelButton} onClick={() => setOpen(false)}>Cancel</button>

                    <button className={`${style.updateButton} ${isLoading ? style.disabled : ''}`} type="button" onClick={onUpdateUser}>
                        { isLoading ? <img src={spinner} className={style.buttonLoader} /> : 'Update' }
                    </button>
                </div>

                <Dialog.Close autoFocus className={style.modalCloseButton}>
                    <IconContext.Provider value={{ className: style.modalCloseIcon }}>
                        <IoClose title={'Close modal'} />
                    </IconContext.Provider>
                </Dialog.Close>
            </Dialog.Content>
        </>
    )
}

export const UserUpdateDialog = React.forwardRef(UserUpdateDialogComponent);
