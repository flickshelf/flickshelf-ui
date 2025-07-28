import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

import style from './About.module.css'

export function About() {
    return (
        <>
            <Header />
                <div className={style.aboutPage}>
                    <section>
                        <h2>Github Repository</h2>
                        <p><a href="https://github.com/flickshelf" target="_blank">github.com/flickshelf</a></p>
                    </section>

                    <section>
                        <h2>Attributions</h2>
                        <p>This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
                        <p>Movie and TV data provided by <a href="https://www.themoviedb.org/" target="_blank">The Movie Database (TMDB)</a>.</p>
                    </section>
                </div>
            <Footer />
        </>
    )
}
