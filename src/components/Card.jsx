import style from './Card.module.css';

import { CreateOutline, Trash} from 'react-ionicons';

export function Card(props) {
    const { serie } = props;

    function handleSerieGenre(genre) {
        let genreToDisplay = ''
      
        switch (genre) {
          case 'comedy':
            genreToDisplay = 'Comedy'
            break;
          case 'sitcom':
            genreToDisplay = 'Sitcom'
            break;
          case 'scifi':
            genreToDisplay = 'Sci/Fi'
            break;
          case 'horror':
            genreToDisplay = 'Horror'
            break;
          case 'drama':
            genreToDisplay = 'Drama'
            break;
          default:
            genreToDisplay = '-'
            break;
        }
        
        return genreToDisplay
    }

    return (
        <div className={style.serieItem}>
            <h3 className={style.serieTitle}>{serie.title}</h3>

            <p>Genre: {handleSerieGenre(serie.genre)}</p>
            <p>Seasons: {serie.seasons}</p>
            <p>Release year: {serie.release_year}</p>

            <div className="synopsis-div">
                <p>Synopsis: {serie.synopsis}</p>
            </div>

            <div className={style.cardButtons}>
                {/* <ion-icon name="create-outline" onclick="handleEditClick('${serie.id}')"></ion-icon> */}
                {/* <ion-icon name="trash" onclick="handleTrashClick('${serie.id}')"></ion-icon> */}
                <CreateOutline
                    title={'Update'}
                    width="16px"
                    height="16px"
                    color
				/>
                <Trash
                    title={'Delete'}
                    width="16px"
                    height="16px"
                    color
				/>
            </div>
        </div>
    )
}
