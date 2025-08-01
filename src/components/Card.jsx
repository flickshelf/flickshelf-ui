import style from './Card.module.css';

import loadingSpinner from '../assets/spinner.gif';

const posterBasePath = import.meta.env.VITE_EXTERNAL_API_IMAGES_URL

export function Card(props) {
    const { serie, isLoading, onClick } = props;

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
        case 'crime':
          genreToDisplay = 'Crime'
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

    const getCardStyle = () => {
      if (!serie.posterUrl) {
        return { backgroundColor: 'rgba(0, 0, 0, 0.6)' }
      }

      return { backgroundImage: `url(${posterBasePath}${serie.posterUrl})` }
    }

    return (
      <div 
        className={style.serieItem} 
        style={getCardStyle()}
        onClick={onClick}
      >
        { (!serie.posterUrl || !posterBasePath) && 
          <h3 className={style.serieTitle}>{serie.title}</h3>
        }
      </div>
    )
}
