import style from './List.module.css';

import axios from 'axios';

import emptyState from '../assets/empty-state.png';

import {Header} from '../components/Header.jsx';

export function List() {
    const getSeries = () => {
        const series = axios.get('https://api.flickshelf.com/1/series')

        return series
    }

    getSeries().then((series) =>{
        console.log(series)
    })

    const openRegisterPage = () => {}

    const openListMoviesPage = () => {}

    const openListSeriesPage = () => {}

    return (
        <>
            <Header/>

            <div className={style.emptyStateContainer}>
                <p className={style.emptyStateText}>No series found. Add your first serie!</p>
                <div className={style.emptyStateImage}>
                    <img src={emptyState} alt="Empty state image" width="400px" />
                </div>
            </div>
        
            <div className={style.websiteContent} id="list-series-container"></div>
        </>
    )
}
