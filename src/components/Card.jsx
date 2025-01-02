import style from './Card.module.css';

import { CreateOutline, Trash} from 'react-ionicons';

import loadingSpinner from '../assets/spinner.gif';

export function Card(props) {
    const { serie, onUpdate, onDelete, isLoading } = props;

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

    if (isLoading.active && isLoading.cardId === serie.id) {
      return (
        <div className={style.serieItem}>
          <div className={style.loadingState}>
            <img src={loadingSpinner} className={style.loadingSpinner}/>
          </div>
        </div>
      )
    }

    return (
        <div className={style.serieItem}>
            <h3 className={style.serieTitle}>{serie.title}</h3>

            <p>Genre: {handleSerieGenre(serie.genre)}</p>
            <p>Seasons: {serie.seasons}</p>
            <p>Release year: {serie.release_year}</p>

            <div className={style.synopsisDiv}>
                <p>Synopsis: {serie.synopsis}</p>
            </div>

            <div className={style.cardButtons}>
              <CreateOutline
                title={'Update'}
                width="16px"
                height="16px"
                color
                onClick={() => onUpdate(serie.id)}
              />
              <Trash
                title={'Delete'}
                width="16px"
                height="16px"
                color
                onClick={() => onDelete(serie.id)}
              />
            </div>
        </div>
    )
}
