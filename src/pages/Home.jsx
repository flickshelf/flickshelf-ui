import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { Header } from '../components/Header'
import { Form } from '../components/Form';
import { Footer } from '../components/Footer'

import style from './Home.module.css'

export function Home() {
    const navigate = useNavigate()
    useEffect(() => {
        checkUserCredentials()
    }, [])

    function checkUserCredentials () {
        const isUserLogged = localStorage.getItem('loggedUserId')

        if (!isUserLogged && window.location.pathname !== '/login') {

            return navigate("/login")
        }
       
        if (isUserLogged && window.location.pathname === '/login') {
            return navigate("/")
        }
    }

    return (
        <div className={style.home}>
            <Header />
            <Form />
            <Footer />
        </div>
    )
}
