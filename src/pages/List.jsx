import style from './List.module.css';

import axios from 'axios';

import emptyState from '../assets/empty-state.png';

import loadingSpinner from '../assets/spinner.gif';

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { IconContext } from "react-icons";
import { IoClose } from "react-icons/io5";

import { Header } from '../components/Header.jsx';
import { Card } from '../components/Card.jsx';

const IS_PROD_ENV = import.meta.env.VITE_ENV === 'prod'
const baseUrl = IS_PROD_ENV ? 'https://api.flickshelf.com' : 'http://localhost:3333'

export function List() {
    const navigate = useNavigate()
    const [series, setSeries] = useState([]);
    const [isLoading, setIsLoading] = useState({ active: false, cardId: undefined });
    const [isModalOpen, setIsModalOpen] = useState({ active: false, serieId: undefined });
    let loggedUser = null

    const getSeries = () => {
        return axios.get(`${baseUrl}/${loggedUser.id}/series`)
    }

    function handleGetSeries() {
        if (!loggedUser) return

        setIsLoading({active: true})

        getSeries()
            .then((returnedSeries) => {
                setSeries(returnedSeries.data)
            }).finally(() => {
                setIsLoading({active: false})
            }) 
    }

    useEffect(() => {
        checkUserCredentials()
        handleGetSeries()
    }, [])

    function checkUserCredentials () {
        loggedUser = JSON.parse(localStorage.getItem('loggedUser'))

        if (!loggedUser && window.location.pathname !== '/login') {
            return navigate("/login")
        }
       
        if (loggedUser && window.location.pathname === '/login') {
            return navigate("/")
        }
    }

    const closeEditSerieModal = () => {
        setIsModalOpen({ active: false });
        handleGetSeries()
    }

    function handleEditClick(serieId) {
        setSeries([])
        setIsModalOpen({ active: true, serieId });
    }

    function handleTrashClick(serieId) {
        const hasConfirm = confirm('Are you sure you want to delete?')

        if (hasConfirm) {
            setIsLoading({ active: true, cardId: serieId })

            axios.delete(`${baseUrl}/serie/${serieId}`)
                .then(() => {
                    getSeries().then((returnedSeries) => {
                        setSeries(returnedSeries.data)
                    }).finally(() => {
                        setIsLoading({ active: false, cardId: serieId })
                    })
                }).catch(() => {
                    alert('There was an error while deleting this serie. Try again.')
                    setIsLoading({ active: false, cardId: undefined })
                })
        }
    }

    const modalContent = IS_PROD_ENV ? 'https://flickshelf.com/update-serie' : 'http://localhost:5173/update-serie'

    return (
        <>
            <Header/>

            { isLoading.active && !isLoading.cardId && <div className={style.emptyState}>
                <img src={loadingSpinner}/>
            </div>}

            { !isLoading.active && !series.length && <div className={style.emptyStateContainer}>
                <p className={style.emptyStateText}>No series found. Add your first serie!</p>
                <div className={style.emptyStateImage}>
                    <img src={emptyState} alt="Empty state image" width="400px" />
                </div>
            </div>}
        
            <div className={style.websiteContent}>
                { series.map((serie) => {
                    return (
                        <Card 
                            key={serie.id} 
                            serie={serie}
                            onUpdate={handleEditClick}
                            onDelete={handleTrashClick}
                            isLoading={isLoading}
                        />
                    )
                }) }
            </div>

            { isModalOpen.active && <div className={style.editSerieModal}>
                <div className={style.modalHeader}>
                    <button className={style.editModalCloseButton}>
                        <IconContext.Provider value={{ className: style.listIcon }}>
                            <IoClose 
                                onClick={() => closeEditSerieModal()}
                                title={'Close modal'}
                            />
                        </IconContext.Provider>
                    </button>
                    </div>
                <iframe src={modalContent} name={isModalOpen.serieId}></iframe>
            </div> }
        </>
    )
}
