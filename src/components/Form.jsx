import { useEffect, useState } from 'react';

import style from './Form.module.css';

import axios from 'axios';

import spinner from '../assets/white-button-spinner.gif'

export function Form() {
    const serieFormat = {
        title: '',
        genre: '',
        seasons: '',
        release_year: '',
        synopsis: ''
    }

    const [serie, setSerie] = useState(serieFormat)
    const [isLoading, setIsLoading] = useState(false)

    const [serieTitle, setSerieTitle] = useState('')
    const [serieGenre, setSerieGenre] = useState('')
    const [serieSeasons, setSerieSeasons] = useState()
    const [serieReleaseYear, setSerieReleaseYear] = useState()
    const [serieSynopsis, setSerieSynopsis] = useState('')

    const serieId = window.name;

    async function getSerieById(serieId) {
        const serie = await axios.get(`https://api.flickshelf.com/series/${serieId}`)
        return serie;
    }

    useEffect(() => {
        if (serieId) {
            getSerieById(serieId)
                .then((serie) => {
                    console.log(serie.data)
                    setSerie(serie.data[0])
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

        // const ownerId = localStorage.getItem('loggedUserId')

        setIsLoading(true)

        axios.post('https://api.flickshelf.com/series', {
                ownerId: 2,
                serieTitle,
                serieGenre,
                serieSeasons,
                serieReleaseYear,
                serieSynopsis,
            })
            .then(() => {
                alert(`Serie ${serieTitle} created successfully!`)

                // localStorage.removeItem('formValues')

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
            <div className={style.serieCreationForm} id="serie-form">
                <h2 className={style.title}>Create your serie</h2>
                <label htmlFor="serie-title">Title</label>
                <input 
                    type="text" 
                    value={serieTitle || serie.title}
                    onChange={onChangeTitle}
                    placeholder="Type series title..."
                    onBlur={saveFilledValues()}
                />
                
                <label htmlFor="serie-genre">Genre</label>
                <select value={serieGenre || serie.genre} onChange={onChangeSerieGenre}>
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
                    value={serieSeasons || serie.seasons}
                    onChange={onChangeSeasons}
                    placeholder="Total seasons number"
                    onBlur={saveFilledValues()}
                    min="1"
                    max="50"
                />
    
                <label htmlFor="serie-release-year">Release year</label>
                <input 
                    type="number" 
                    value={serieReleaseYear || serie.release_year}
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
                    value={serieSynopsis || serie.synopsis}
                    onChange={onChangeSerieSynopsis}
                    placeholder="Type serie synopsis..."
                    onBlur={saveFilledValues()}
                ></textarea>

                <button className={`${style.createButton} ${isLoading ? style.disabled : ''}`} type="button" onClick={create}>
                    { isLoading ? <img src={spinner} className={style.buttonLoader} /> : 'Create' }
                </button>
            </div>
        </form>
    )
}
