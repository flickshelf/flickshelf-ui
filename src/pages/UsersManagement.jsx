import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import style from './UsersManagement.module.css'

import { Header } from '../components/Header'
import { UserCard } from '../components/UserCard'

const IS_DEV_ENV = true

const baseUrl = IS_DEV_ENV ? 'http://localhost:3333' : 'https://api.flickshelf.com'

export const UsersManagement = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState({active: false, id: undefined});

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('loggedUser'))

        if (user.role !== 'ADMIN') return navigate('/login')

        getAllUsers()
    }, [])

    function getAllUsers() {
        axios.get(`${baseUrl}/users`)
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

        axios.delete(`${baseUrl}/users/${userId}`)
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
                        return <UserCard 
                            key={user.id} 
                            user={user} 
                            onUpdate={updateUser} 
                            onDelete={deleteUser} 
                            isLoading={isLoading} 
                            handleUsersUpdate={getAllUsers}
                        />
                    }) }
                </div>
            </div>
        </>
    )
}
