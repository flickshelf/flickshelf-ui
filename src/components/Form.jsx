export function Form() {
    function saveFilledValues() {}

    const create = () => {
        console.log('clicked create')
    }

    return (
        <form id="form">
            <div className={style.serieCreationForm} id="serie-form">
                <h2 className={style.title}>Create your serie</h2>
                <label htmlFor="serie-title">Title</label>
                <input 
                    id="serie-title"
                    type="text" 
                    placeholder="Type series title..."
                    onBlur={saveFilledValues()}
                />
                
                <label htmlFor="serie-genre">Genre</label>
                <select id="serie-genre" onChange={saveFilledValues()}>
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
                    placeholder="Total seasons number"
                    onBlur={saveFilledValues()}
                    min="1"
                    max="50"
                />
    
                <label htmlFor="serie-release-year">Release year</label>
                <input 
                    id="serie-release-year"
                    type="number" 
                    placeholder="Serie release year"
                    onBlur={saveFilledValues()}
                    min="1957"
                    max="2024"
                />
            
                <label htmlFor="serie-synopsis">Synopsis</label>
                <textarea 
                    id="serie-synopsis" 
                    name="Synopsis" 
                    placeholder="Type serie synopsis..."
                    onBlur={saveFilledValues()}
                ></textarea>

                <button className={style.createButton} type="button" onClick={create}>Create</button>
            </div>
        </form>
    )
}
