import { Header } from '../components/Header'
import { Form } from '../components/Form';
import { Footer } from '../components/Footer'

import style from './Home.module.css'

export function Home() {
    return (
        <div className={style.home}>
            <Header />
            <Form />
            <Footer />
        </div>
    )
}
