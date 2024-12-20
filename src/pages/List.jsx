import style from './List.module.css';

import axios from 'axios';

import emptyState from '../assets/empty-state.png';

export function List() {
    const getSeries = () => {
        const series = axios.get('https://api.flickshelf.com/1/series')

        console.log(series)

        return series
    }

    getSeries()

    const openRegisterPage = () => {}

    const openListMoviesPage = () => {}

    const openListSeriesPage = () => {}

    return (
        <>
            <header className={style.websiteHeader}>
                <div className={style.darkBlueHeader}>
                    <div className={style.logo}>
                        <a onClick={openRegisterPage}>
                            <img id="logotipo" src="../png/temp-logo.png" />
                        </a>
                    </div>
                    <nav id="navigation">
                        <ul>
                            <input className={style.registerBtn} type="button" value="Register" onClick={openRegisterPage} />
                            <input className={style.mListBtn} type="button" value="Movies list" onClick={openListMoviesPage} />
                            <input className={style.sListBtn} type="button" value="Series list" onClick={openListSeriesPage} />
                        </ul>
                    </nav>
                </div>
            </header>

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
