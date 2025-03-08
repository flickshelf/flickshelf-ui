import { useEffect, useState } from 'react';

import axios from 'axios';

import style from './UsersManagement.module.css'

import { Header } from '../components/Header'
import { UserCard } from '../components/UserCard'

// const apiUrl = 'https://api.flickshelf.com'
const apiUrl = 'http://localhost:3333'

export const UsersManagement = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers()
    }, [])

    function getAllUsers() {
        axios.get(`${apiUrl}/users`)
            .then((allUsers) => {
                setUsers(allUsers.data)
            })
            .catch((error) => {
                console.error(error)
                alert('There was an error on getting users. Try again.')
            })
    }

    return (
        <>
            <Header />

            <div className={style.usersManagementGeneralContainer}>
                <h2 className={style.pageTitle}>Users Management</h2>

                <div className={style.usersList}>
                    { users.map((user) => {
                        return <UserCard key={user.id} user={user}/>
                    }) }
                </div>
            </div>
        </>
    )
}
