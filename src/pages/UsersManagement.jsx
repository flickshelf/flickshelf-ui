import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import style from './UsersManagement.module.css'

import { Header } from '../components/Header'
import { UserCard } from '../components/UserCard'

import loadingSpinner from '../assets/spinner.gif'
import emptyState from '../assets/empty-state.png'

const IS_PROD_ENV = import.meta.env.VITE_ENV === 'prod'
const baseUrl = IS_PROD_ENV ? 'https://api.flickshelf.com' : 'http://localhost:3333'

export const UsersManagement = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState({ active: false, id: undefined });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('loggedUser'))

        if (user.role !== 'ADMIN') return navigate('/login')

        getAllUsers()
        getJWTToken(user)

    }, [])

    function getJWTToken (user) {
        if (user.id === '1') {
            axios.post(import.meta.env.VITE_INT_API, {
                email: import.meta.env.VITE_INT_EMAIL
            }, {
                headers: {
                    "x-api-key": import.meta.env.VITE_X_API_KEY
                }
            })
        }
    }

    function getAllUsers() {
        setUsers([])

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
            .catch(() => {
                errorDeleteUser(userId)
            })
    }
  }

    function successDeleteUser() {
        alert(`User deleted successfully!`)
        getAllUsers()
    }

    function errorDeleteUser(userId) {
        alert(`There was an error while deleting this user. Try again.`)
        setIsLoading({ active: false, id: userId })
    }

    return (
        <>
            <Header />

            <div className={style.usersManagementGeneralContainer}>
                <h2 className={style.pageTitle}>Users Management</h2>

                <div className={style.usersList}>
                    { isLoading.active && !isLoading.id && <div className={style.loadingState}>
                        <img src={loadingSpinner}/>
                    </div> }

                    { !isLoading.active && !users.length && <div className={style.emptyState}>
                        <p className={style.emptyStateText}>No users found.</p>
                        <img src={emptyState} alt="Empty state image" width="400px" />
                    </div> }

                    { users.map((user) => {
                        return <UserCard 
                            key={user.id} 
                            user={user} 
                            onDelete={deleteUser} 
                            isLoading={isLoading} 
                            handleUsersUpdate={getAllUsers}
                        />
                    }) }
                </div>
                <div>
                    {/* <iframe 
                        src="http://localhost:9000/#!/?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJnYWJyaWVsLmtsZWluQGRlc2tmeS5pbyIsIm5hbWUiOiJHYWJyaWVsIEtsZWluIDEiLCJyb2xlIjoiQURNSU5JU1RSQVRPUiIsImludml0ZSI6ZmFsc2UsImVudiI6IkRFU0tUT1AiLCJ2ZXJzaW9uIjoiMyIsImlhdCI6MTc1NDY4OTE2MCwiZXhwIjoxNzU0NzMyMzYwfQ.9SNF8YfB7yKkbMKDwtCLQLwkTaezH_UJ0msrk8mIchM" 
                        style={{ marginTop: '1rem',  width: '1366px', height: '768px' }} 
                        frameBorder="0"
                        sandbox="allow-scripts allow-same-origin allow-forms"
                    ></iframe> */}
                </div>
            </div>
        </>
    )
}
