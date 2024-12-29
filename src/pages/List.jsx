import style from './List.module.css';

import axios from 'axios';

import emptyState from '../assets/empty-state.png';

import { useState, useEffect } from 'react';

import { Header } from '../components/Header.jsx';
import { Card } from '../components/Card.jsx';

export function List() {
    const [series, setSeries] = useState([]);

    const getSeries = () => {
        return axios.get('https://api.flickshelf.com/2/series')
    }

    useEffect(() => {
        getSeries()
            .then((returnedSeries) => {
                setSeries(returnedSeries.data)
            })
    }, [])

    const openRegisterPage = () => {}

    const openListMoviesPage = () => {}

    const openListSeriesPage = () => {}

    function handleEditClick(serieId) {
        console.log('editing serie ' + serieId)
    }

    function handleTrashClick(serieId) {
        console.log('deleting serie ' + serieId)
    }

    return (
        <>
            <Header/>

            { !series.length && <div className={style.emptyStateContainer}>
                <p className={style.emptyStateText}>No series found. Add your first serie!</p>
                <div className={style.emptyStateImage}>
                    <img src={emptyState} alt="Empty state image" width="400px" />
                </div>
            </div>}
        
            <div className={style.websiteContent} id="list-series-container">
                { series.map((serie) => {
                    return (
                        <Card 
                            key={serie.id} 
                            serie={serie}
                            onUpdate={handleEditClick}
                            onDelete={handleTrashClick}
                        />
                    )
                }) }
            </div>
        </>
    )
}
