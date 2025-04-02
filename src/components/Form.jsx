import { useEffect, useState } from 'react';

import style from './Form.module.css';

import axios from 'axios';

import spinner from '../assets/white-button-spinner.gif'

const api = 'https://api.flickshelf.com';

export function Form(props) {
    const { isCreating = true } = props;

    const [isLoading, setIsLoading] = useState(false)

    const [serieTitle, setSerieTitle] = useState('')
    const [serieGenre, setSerieGenre] = useState('')
    const [serieSeasons, setSerieSeasons] = useState('')
    const [serieReleaseYear, setSerieReleaseYear] = useState('')
    const [serieSynopsis, setSerieSynopsis] = useState('')

    const serieId = window.name;

    const translations = {
        title: isCreating ? "Create your serie" : "Update serie",
        button: isCreating ? 'Create' : 'Update',
    }

    async function getSerieById(serieId) {
        const serie = await axios.get(`${api}/series/${serieId}`)
        return serie;
    }

    useEffect(() => {
        if (serieId) {
            getSerieById(serieId)
                .then((returnedSerie) => {
                    const serie = returnedSerie.data[0]

                    setSerieTitle(serie.title)
                    setSerieGenre(serie.genre)
                    setSerieSeasons(serie.seasons)
                    setSerieReleaseYear(serie.release_year)
                    setSerieSynopsis(serie.synopsis)
                })
        }
    }, [])

    function saveFilledValues() {}

    const create = () => {
        if (
            serieTitle === "" 
            || serieGenre === "" 
            || serieSeasons === "" 
            || serieReleaseYear === "" 
            || serieSynopsis === ""
        ) {
            return alert("All informations needs to be filled!")
        } 

        const loggedUser = JSON.parse(localStorage.getItem('loggedUser'))

        const ownerId = String(loggedUser.id)

        setIsLoading(true)

        axios.post(`${api}/series`, {
                ownerId,
                serieTitle,
                serieGenre,
                serieSeasons,
                serieReleaseYear,
                serieSynopsis,
            })
            .then(() => {
                alert(`Serie ${serieTitle} created successfully!`)

                setSerieTitle('')
                setSerieGenre('')
                setSerieSeasons('')
                setSerieReleaseYear('')
                setSerieSynopsis('')
            })
            .catch(() => {
                alert('There was an error. Try again.');
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const update = () => {
        setIsLoading(true)

        axios.put(`${api}/serie/${serieId}`, {
            serieTitle,
            serieGenre, 
            serieSeasons, 
            serieReleaseYear, 
            serieSynopsis,
        }).then(() => {
            alert(`Serie ${serieTitle} updated successfully!`)

            handleUpdate()
        }).catch(() => {
            alert('There was an error while updating. Try again.')
        }).finally(() => {
            setIsLoading(false)
        })
    }

    function handleUpdate() {
        parent.location.reload()
    }

    const onChangeTitle = (event) => {
        const newTitle = event.target.value
        setSerieTitle(newTitle)
    }

    const onChangeSeasons = (event) => {
        const newSeasonsNumber = event.target.value
        setSerieSeasons(newSeasonsNumber)
    }

    const onChangeReleaseYear = (event) => {
        const newReleaseYear = event.target.value
        setSerieReleaseYear(newReleaseYear)
    }

    const onChangeSerieSynopsis = (event) => {
        const newSerieSynopsis = event.target.value
        setSerieSynopsis(newSerieSynopsis)
    }

    const onChangeSerieGenre = (event) => {
        const newSerieGenre = event.target.value
        setSerieGenre(newSerieGenre)
    }

    return (
        <form id="form" className={style.form}>
            <div className={`${style.serieCreationForm} ${isCreating ? '' : style.update}`} id="serie-form">
                <h2 className={style.title}>{translations.title}</h2>
                <label htmlFor="serie-title">Title</label>
                <input 
                    type="text" 
                    value={serieTitle}
                    onChange={onChangeTitle}
                    placeholder="Type series title..."
                    onBlur={saveFilledValues()}
                />
                
                <label htmlFor="serie-genre">Genre</label>
                <select value={serieGenre} onChange={onChangeSerieGenre}>
                    <option value="">Select genre</option>
                    <option value="comedy">Comedy</option>
                    <option value="sitcom">Sitcom</option>
                    <option value="scifi">Sci/Fi</option>
                    <option value="horror">Horror</option>
                    <option value="drama">Drama</option>
                </select>
    
                <label htmlFor="serie-seasons">Seasons</label>
                <input 
                    type="number" 
                    value={serieSeasons}
                    onChange={onChangeSeasons}
                    placeholder="Total seasons number"
                    onBlur={saveFilledValues()}
                    min="1"
                    max="50"
                />
    
                <label htmlFor="serie-release-year">Release year</label>
                <input 
                    type="number" 
                    value={serieReleaseYear}
                    onChange={onChangeReleaseYear}
                    placeholder="Serie release year"
                    onBlur={saveFilledValues()}
                    min="1957"
                    max="2024"
                />
            
                <label htmlFor="serie-synopsis">Synopsis</label>
                <textarea 
                    id="serie-synopsis" 
                    name="Synopsis" 
                    value={serieSynopsis}
                    onChange={onChangeSerieSynopsis}
                    placeholder="Type serie synopsis..."
                    onBlur={saveFilledValues()}
                ></textarea>

                <button className={`${style.createButton} ${isLoading ? style.disabled : ''}`} type="button" onClick={isCreating ? create : update}>
                    { isLoading ? <img src={spinner} className={style.buttonLoader} /> : translations.button }
                </button>
            </div>
        </form>
    )
}
