import { useState } from 'react';

import style from './Form.module.css'

export function Form() {
    const [serieTitle, setSerieTitle] = useState('')
    const [serieGenre, setSerieGenre] = useState('')
    const [serieSeasons, setSerieSeasons] = useState(0)
    const [serieReleaseYear, setSerieReleaseYear] = useState(0)
    const [serieSynopsis, setSerieSynopsis] = useState('')

    function saveFilledValues() {}

    const create = () => {
        console.log(serieTitle, serieGenre, serieSeasons, serieReleaseYear, serieSynopsis)

        // -------------------------------
        
        // if (
        //     serieTitle.value === "" 
        //     || serieGenre.value === "" 
        //     || serieSeasons.value === "" 
        //     || serieReleaseYear.value === "" 
        //     || serieSynopsis.value === ""
        // ) {
        //     return alert("All informations needs to be filled!")
        // } 

        // const ownerId = localStorage.getItem('loggedUserId')

        // disableButton()

        // axios.post('https://api.flickshelf.com/series', {
        //     ownerId,
        //     serieTitle: serieTitle.value,
        //     serieGenre: serieGenre.value,
        //     serieSeasons: serieSeasons.value,
        //     serieReleaseYear: serieReleaseYear.value,
        //     serieSynopsis: serieSynopsis.value,
        //     })
        //     .then(() => {
        //     alert(`Serie ${serieTitle.value} created successfully!`)
        //     localStorage.removeItem('formValues')

        //     serieTitle.value = ''
        //     serieGenre.value = ''
        //     serieSeasons.value = ''
        //     serieReleaseYear.value = ''
        //     serieSynopsis.value = ''
        //     })
        //     .catch(() => {
        //     alert('There was an error. Try again.');
        //     })
        //     .finally(() => {
        //     enableButton()
        //     })
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

                <button className={style.createButton} type="button" onClick={create}>Create</button>
            </div>
        </form>
    )
}
