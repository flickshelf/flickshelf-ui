import style from '../components/Footer.module.css'

import { useNavigate } from 'react-router-dom'

import { IconContext } from "react-icons";
import { IoLogoInstagram, IoLogoTwitter, IoLogoFacebook } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

export function Footer() {
    const navigate = useNavigate()

    const openAboutPage = () => {
        navigate('/about')
    }

    return (
        <footer>
            <div className={style.lightBlueFooter}>
                <div className={style.socialItems}>
                    <div className={style.leftItems}>
                        <h3>FlickShelf</h3>
                    </div>
                    <div className={style.rightItems}>
                        <p>Follow us</p>
                        <div className={style.rightItemsIcons}>
                            <a href="#">
                                <IconContext.Provider value={{ className: style.footerIcon }}>
                                    <IoLogoInstagram />
                                </IconContext.Provider>
                            </a>
                            <a href="#">
                                <IconContext.Provider value={{ className: style.footerIcon }}>
                                    <IoLogoTwitter />
                                </IconContext.Provider>
                            </a>
                            <a href="" target="_blank">
                                <IconContext.Provider value={{ className: style.footerIcon }}>
                                    <IoLogoFacebook />
                                </IconContext.Provider>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.darkBlueFooter}>
                <div className={style.darkFooter}>
                    <div className={style.emailContainer}>
                        <IconContext.Provider value={{ className: style.footerMailIcon }}>
                            <MdEmail />
                        </IconContext.Provider>
                        <p><a href="mailto:contact@seriescrud.com.br">contact@flickshelf.com</a></p>
                    </div>
                    <a onClick={openAboutPage} className={style.aboutContainer}>About</a>
                </div>
            </div>
        </footer>
    )
}
