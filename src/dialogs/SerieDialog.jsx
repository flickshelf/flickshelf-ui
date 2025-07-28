import React from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import { IconContext } from 'react-icons';
import { IoPencil, IoTrash } from "react-icons/io5";
import { IoClose } from 'react-icons/io5';

import style from './SerieDialog.module.css';

function SerieDialogComponent (props, ref) {
    const { serie, onUpdate, onDelete } = props;

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

    const getSerieCover = () => {
        if (serie.coverUrl) {
            return `https://image.tmdb.org/t/p/original/${serie.coverUrl}`
        }
    } 

    return (
        <>
            <Dialog.Overlay className={style.modalOverlay} />

            <Dialog.Content className={style.modalContent}>
                <Dialog.Title></Dialog.Title>
                <Dialog.Description></Dialog.Description>

                <div className={`${style.serieCover} ${serie.coverUrl ? style.hasCover : '' }`}>
                    <img src={getSerieCover()} alt="" />
                </div>
                <div className={style.serieInfo}>
                    <div className={style.editableInfo}>
                        <h3 className={style.serieTitle}>{serie.title}</h3>
                        <p>Genre: {handleSerieGenre(serie.genre)}</p>
                        <p>Seasons: {serie.seasons}</p>
                        <p>Release year: {serie.release_year}</p>

                        <div className={style.synopsisDiv}>
                            <p>Synopsis: {serie.synopsis}</p>
                        </div>
                    </div>
                    <div className={style.cardButtons}>
                        <IconContext.Provider value={{ className: style.cardIcon }}>
                            <IoPencil 
                                onClick={() => onUpdate(serie.id)}
                                title={'Update'}
                            />
                            <IoTrash 
                                onClick={() => onDelete(serie.id)}  
                                title={'Delete'}
                            />
                        </IconContext.Provider>
                    </div>
                </div>
                <Dialog.Close autoFocus className={style.modalCloseButton}>
                    <IconContext.Provider value={{ className: style.modalCloseIcon }}>
                        <IoClose title={'Close modal'} />
                    </IconContext.Provider>
                </Dialog.Close>
            </Dialog.Content>
        </>
    )
}

export const SerieDialog = React.forwardRef(SerieDialogComponent);
