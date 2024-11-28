import style from '../components/Footer.module.css'
import { LogoFacebook, LogoTwitter, LogoInstagram } from 'react-ionicons'

export function Footer() {
    return (
        <footer>
            <div className={style.lightBlueFooter}>
                <div className={style.socialItems}>
                    <div className={style.leftItems}>
                        <h3>FlickShelf</h3>
                    </div>
                    <div className={style.rightItems}>
                        <p>Follow us</p>
                        <div>
                            <a href="#">
                                <LogoInstagram
                                    width="23.3px"
                                    height="23.3px"
                                />
                            </a>
                            <a href="#">
                                <LogoTwitter
                                    width="23.3px"
                                    height="23.3px"
                                />
                            </a>
                            <a href="" target="_blank">
                                <LogoFacebook 
                                    width="23.3px"
                                    height="23.3px"
                                />
                            </a>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.darkBlueFooter}>
                <div className={style.darkFooter}>
                    <img src="png/email-icon.webp" alt="Email icon" />
                    <p><a href="mailto:contact@seriescrud.com.br">contact@flickshelf.com</a></p>
                </div>
            </div>
        </footer>
    )
}
