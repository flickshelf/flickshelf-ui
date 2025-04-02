import { useEffect, useState } from 'react';

import axios from 'axios';

import style from './UsersManagement.module.css'

import { Header } from '../components/Header'
import { UserCard } from '../components/UserCard'

// const apiUrl = 'https://api.flickshelf.com'
const apiUrl = 'http://localhost:3333'

export const UsersManagement = () => {
    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState({active: false, id: undefined});

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

    const updateUser = (userId) => {
        console.log(`Update user ${userId}`)
    }

  const deleteUser = (userId) => {
    const userDidConfirm = confirm('Are you sure you want to delete this user?')

    if (userDidConfirm) {
        setIsLoading({active: true, id: userId})

        axios.delete(`${apiUrl}/users/${userId}`)
            .then(successDeleteUser)
            .catch(errorDeleteUser)
            .finally(() => {
              setIsLoading({active: false, id: userId})
            })
    }
  }

  function successDeleteUser() {
      alert(`User deleted successfully!`)
      getAllUsers()
  }

  function errorDeleteUser() {
      alert(`There was an error while deleting this user. Try again.`)
  }

    return (
        <>
            <Header />

            <div className={style.usersManagementGeneralContainer}>
                <h2 className={style.pageTitle}>Users Management</h2>

                <div className={style.usersList}>
                    { users.map((user) => {
                        return <UserCard key={user.id} user={user} onUpdate={updateUser} onDelete={deleteUser} isLoading={isLoading} />
                    }) }
                </div>
            </div>
        </>
    )
}
