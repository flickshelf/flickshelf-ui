import style from './List.module.css';

export function List() {
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

            <div id="empty-state-container">
                <p className={style.emptyStateText}>No series found. Add your first serie!</p>
                <div className={style.emptyStateImage}>
                    <img src="../png/empty-state.png" alt="Empty state image" width="400px" />
                </div>
            </div>
        
            <div className={style.websiteContent} id="list-series-container"></div>
        </>
    )
}
