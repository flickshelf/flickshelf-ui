return function Card() { 
    <div className="serie-item" id="serie.id">
        <h3 className="serie-title">serie.title</h3>
        <p>Genre: ${handleSerieGenre(serie.genre)}</p>      
        <p>Season: ${serie.seasons}</p>  
        <p>Release year: ${serie.release_year}</p>  

        <div className="synopsis-div">
            <p>Synopsis: ${serie.synopsis}</p>
        </div>

       <div className="card-buttons">
        <ion-icon name="create-outline" onclick="handleEditClick('${serie.id}')"></ion-icon>
        <ion-icon name="trash" onclick="handleTrashClick('${serie.id}')"></ion-icon>
       </div>
    </div>
} 