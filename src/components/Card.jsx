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

    const getCardStyle = () => {
      if (!serie.coverUrl) {
        return { backgroundColor: 'rgba(0, 0, 0, 0.6)' }
      }

      return { backgroundImage: `url(${posterBasePath}${serie.posterUrl})` }
    }

    return (
      <div 
        className={style.serieItem} 
        style={getCardStyle()}
        onClick={onClick}
      ></div>
    )
}
