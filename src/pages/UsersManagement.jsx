import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import style from './UsersManagement.module.css'

import { Header } from '../components/Header'
import { UserCard } from '../components/UserCard'

import loadingSpinner from '../assets/spinner.gif'
import emptyState from '../assets/empty-state.png'

const IS_DEV_ENV = true

const baseUrl = IS_DEV_ENV ? 'http://localhost:3333' : 'https://api.flickshelf.com'

export const UsersManagement = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState({ active: false, id: undefined });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('loggedUser'))

        if (user.role !== 'ADMIN') return navigate('/login')

        getAllUsers()
    }, [])

    function getAllUsers() {
        setIsLoading({ active: true })

        axios.get(`${baseUrl}/users`)
            .then((allUsers) => {
                setUsers(allUsers.data)
            })
            .catch((error) => {
                console.error(error)
                alert('There was an error on getting users. Try again.')
            })
            .finally(() => {
                setIsLoading({ active: false })
            })
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
                    { isLoading.active && <div className={style.loadingState}>
                        <img src={loadingSpinner}/>
                    </div> }

                    { !isLoading.active && !users.length && <div className={style.emptyState}>
                        <p className={style.emptyStateText}>No users found.</p>
                        <img src={emptyState} alt="Empty state image" width="400px" />
                    </div> }

                    { users.map((user) => {
                        return <UserCard key={user.id} user={user} onDelete={deleteUser} isLoading={isLoading} />
                    }) }
                </div>
            </div>
        </>
    )
}
