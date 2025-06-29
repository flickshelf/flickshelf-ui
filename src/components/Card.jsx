import style from './Card.module.css';

import loadingSpinner from '../assets/spinner.gif';

const posterBasePath = import.meta.env.VITE_EXTERNAL_API_IMAGES_URL

export function Card(props) {
    const { serie, isLoading, onClick } = props;

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
        <div 
          className={style.serieItem} 
          style={{ backgroundImage: `url(${posterBasePath}${serie.posterUrl})` }}
          onClick={onClick}
        >
            <h3 className={style.serieTitle}>{serie.title}</h3>
        </div>
    )
}
