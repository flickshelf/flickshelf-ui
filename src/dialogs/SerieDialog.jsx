import React from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import { IconContext } from 'react-icons';
import { IoClose } from 'react-icons/io5';

import style from './SerieDialog.module.css';

function SerieDialogComponent (props, ref) {
    const { serie } = props;

    return (
        <>
            <Dialog.Overlay className={style.modalOverlay} />

            <Dialog.Content className={style.modalContent}>
                <Dialog.Title></Dialog.Title>
                <Dialog.Description></Dialog.Description>

                <div className={style.serieCover}>
                    <img src="" alt="" />
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
