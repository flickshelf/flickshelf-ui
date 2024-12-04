import style from '../components/Footer.module.css'
import { LogoFacebook, LogoTwitter, LogoInstagram, MailOutline } from 'react-ionicons'


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
                        <div className={style.rightItemsIcons}>
                            <a href="#">
                                <LogoInstagram
                                    width="24px"
                                    height="24px"
                                />
                            </a>
                            <a href="#">
                                <LogoTwitter
                                    width="24px"
                                    height="24px"
                                />
                            </a>
                            <a href="" target="_blank">
                                <LogoFacebook 
                                    width="24px"
                                    height="24px"
                                />
                            </a>
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.darkBlueFooter}>
                <div className={style.darkFooter}>
                    <MailOutline
                        className={style.mailIcon}
                        width="20px"
                        height="20px"
                    />
                    <p><a href="mailto:contact@seriescrud.com.br">contact@flickshelf.com</a></p>
                </div>
            </div>
        </footer>
    )
}
