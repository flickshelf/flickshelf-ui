import { useState } from 'react';

import style from './UsersManagement.module.css'

import { Header } from '../components/Header'
import { UserCard } from '../components/UserCard'

export const UsersManagement = () => {
    const [users, setUsers] = useState([]);

    return (
        <>
            <Header />

            <div className={style.usersManagementGeneralContainer}>
                <h2 className={style.pageTitle}>Users Management</h2>

                <div className={style.usersList}>
                    { users.map((user) => {
                        return <UserCard />
                    }) }
                </div>
            </div>
        </>
    )
}
