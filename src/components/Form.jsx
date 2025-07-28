import { useEffect, useState } from 'react';

import axios from 'axios';

import style from './Form.module.css';

import spinner from '../assets/white-button-spinner.gif'

const IS_PROD_ENV = import.meta.env.VITE_ENV === 'prod'
const baseUrl = IS_PROD_ENV ? 'https://api.flickshelf.com' : 'http://localhost:3333'

export function Form(props) {
    const { isCreating = true } = props;

    const [isLoading, setIsLoading] = useState(false)

    const [serieTitle, setSerieTitle] = useState('')
    const [serieGenre, setSerieGenre] = useState('')
    const [serieSeasons, setSerieSeasons] = useState('')
    const [serieReleaseYear, setSerieReleaseYear] = useState('')
    const [serieSynopsis, setSerieSynopsis] = useState('')
    const [seriePosterUrl, setSeriePosterUrl] = useState('')
    const [serieCoverUrl, setSerieCoverUrl] = useState('')

    const serieId = window.name;

    const translations = {
        title: isCreating ? "Create your serie" : "Update serie",
        button: isCreating ? 'Create' : 'Update',
    }

    async function getSerieById(serieId) {
        const serie = await axios.get(`${baseUrl}/series/${serieId}`)
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

        axios.post(`${baseUrl}/series`, {
                ownerId,
                serieTitle,
                serieGenre,
                serieSeasons,
                serieReleaseYear,
                serieSynopsis,
                seriePosterUrl,
                serieCoverUrl,
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

        axios.put(`${baseUrl}/serie/${serieId}`, {
            serieTitle,
            serieGenre, 
            serieSeasons, 
            serieReleaseYear, 
            serieSynopsis,
            seriePosterUrl,
            serieCoverUrl,
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

    const searchSerieFromExternalAPI = () => {
        if (!serieTitle || serieTitle?.length < 2) return

        axios.get(`${baseUrl}/serie/externalApi?search=${serieTitle}`)
            .then(handleSuccessSearchSerieFromExternalAPI)
            .catch(handleErrorSearchSerieFromExternalAPI)
    }

    const handleSuccessSearchSerieFromExternalAPI = (serie) => {
        fillFormFieldsWithSearchedSerie(serie.data)
    }

    const handleErrorSearchSerieFromExternalAPI = (err) => {
        console.error(err)
    }

    const fillFormFieldsWithSearchedSerie = (serie) => {
        setSerieGenre(serie?.genres?.[0]?.name.toLowerCase())
        setSerieSeasons(serie?.number_of_seasons)
        setSerieReleaseYear(serie?.first_air_date.substring(0,4))
        setSerieSynopsis(serie?.overview)
        setSeriePosterUrl(serie?.poster_path)
        setSerieCoverUrl(serie?.backdrop_path)
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
                    id="serie-title"
                    type="text" 
                    value={serieTitle}
                    onChange={onChangeTitle}
                    placeholder="Type series title..."
                    onBlur={searchSerieFromExternalAPI}
                />
                
                <label htmlFor="serie-genre">Genre</label>
                <select id="serie-genre" value={serieGenre} onChange={onChangeSerieGenre}>
                    <option value="">Select genre</option>
                    <option value="comedy">Comedy</option>
                    <option value="sitcom">Sitcom</option>
                    <option value="scifi">Sci/Fi</option>
                    <option value="horror">Horror</option>
                    <option value="drama">Drama</option>
                </select>
    
                <label htmlFor="serie-seasons">Seasons</label>
                <input 
                    id="serie-seasons"
                    type="number" 
                    value={serieSeasons}
                    onChange={onChangeSeasons}
                    placeholder="Total seasons number"
                    min="1"
                    max="50"
                />
    
                <label htmlFor="serie-release-year">Release year</label>
                <input 
                    id="serie-release-year"
                    type="number" 
                    value={serieReleaseYear}
                    onChange={onChangeReleaseYear}
                    placeholder="Serie release year"
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
                ></textarea>

                <button className={`${style.createButton} ${isLoading ? style.disabled : ''}`} type="button" onClick={isCreating ? create : update}>
                    { isLoading ? <img src={spinner} className={style.buttonLoader} /> : translations.button }
                </button>
            </div>
        </form>
    )
}
