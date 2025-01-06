import style from './List.module.css';

import axios from 'axios';

import emptyState from '../assets/empty-state.png';

import loadingSpinner from '../assets/spinner.gif';

import { useState, useEffect } from 'react';

import { Header } from '../components/Header.jsx';
import { Card } from '../components/Card.jsx';

export function List() {
    const [series, setSeries] = useState([]);
    const [isLoading, setIsLoading] = useState({ active: false, cardId: undefined });
    const [isModalOpen, setIsModalOpen] = useState({ active: false, serieId: undefined });

    const getSeries = () => {
        return axios.get('https://api.flickshelf.com/2/series')
    }

    useEffect(() => {
        setIsLoading({active: true})

        getSeries()
            .then((returnedSeries) => {
                setSeries(returnedSeries.data)
            }).finally(() => {
                setIsLoading({active: false})
            }) 
    }, [])

    const openRegisterPage = () => {}

    const openListMoviesPage = () => {}

    const openListSeriesPage = () => {}

    function handleEditClick(serieId) {
        setSeries([])
        setIsModalOpen({ active: true, serieId });
    }

    function handleTrashClick(serieId) {
        console.log('deleting serie ' + serieId)
        const hasConfirm = confirm('Are you sure you want to delete?')

        if (hasConfirm) {
            setIsLoading({ active: true, cardId: serieId })

            axios.delete(`https://api.flickshelf.com/serie/${serieId}`)
                .then(() => {
                    getSeries().then((returnedSeries) => {
                        setSeries(returnedSeries.data)
                    }).finally(() => {
                        setIsLoading({ active: false, cardId: serieId })
                    })
                }).catch(() => {
                    alert('There was an error while deleting this serie. Try again.')
                    setIsLoading({ active: false, cardId: serieId })
                })
        }
    }

    const modalContent = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost' 
        ? 'http://localhost:5173/update-serie?id=123' 
        : 'https://flickshelf.com/update-serie'

    return (
        <>
            <Header/>

            { isLoading.active && <div className={style.emptyState}>
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
                <iframe src={modalContent} name={isModalOpen.serieId}></iframe>
            </div> }
        </>
    )
}
