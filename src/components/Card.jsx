import style from './Card.module.css';

export function Card(props) {
    const { serie } = props;

    return (
        <div className={style.serieItem}>
            <h3 className={style.serieTitle}>{serie.title}</h3>

            {/* <p>Genre: ${handleSerieGenre(serie.genre)}</p> */}
            <p>Seasons: {serie.seasons}</p>
            <p>Release year: {serie.release_year}</p>

            <div className="synopsis-div">
                <p>Synopsis: {serie.synopsis}</p>
            </div>

            <div className="card-buttons">
                {/* <ion-icon name="create-outline" onclick="handleEditClick('${serie.id}')"></ion-icon> */}
                {/* <ion-icon name="trash" onclick="handleTrashClick('${serie.id}')"></ion-icon> */}
            </div>
        </div>
    )
}
