import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Login.module.css'

import axios from 'axios';

import spinner from '../assets/white-button-spinner.gif'

const baseUrl = 'https://api.flickshelf.com'

export function Login() {
    const navigate = useNavigate()
    
    const [isSignIn, setIsSignIn] = useState(false);

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [signupName, setSignupName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    
    const [isLoading, setIsLoading] = useState(false);

    const handleSignInSignUpClick = () => {
        setIsSignIn(!isSignIn)
    }

    const handleLoginEmail = (event) => {
        setLoginEmail(event.target.value)
    }

    const handleLoginPassword = (event) => {
        setLoginPassword(event.target.value)
    }

    const handleSignupName = (event) => {
        setSignupName(event.target.value)
    }

    const handleSignupEmail = (event) => {
        setSignupEmail(event.target.value)
    }

    const handleSignupPassword = (event) => {
        setSignupPassword(event.target.value)
    }

    const showPasswordSignUp = () => {}

    const signUp = () => {
        axios.post(`${baseUrl}/signup`, {
            name: signupName,
            signUpEmail: signupEmail, 
            signUpPassword: signupPassword
        }).then(() => {

        }).catch(() => {
            alert('There was an error. Try again.')
        }).finally(() => {

        })
    } 

    const showPasswordSignIn = () => {}

    const login = () => {
        // disableLoginButton({ button: 'login' })
        setIsLoading(true);

        axios.post(`${baseUrl}/login`, {
            loginEmail,
            loginPassword
        }).then((res) => {
            console.log(res.data)
            const userId = res.data

            if (userId) {
                // storeUserCredentialsOnBrowser(userId)
                
                return navigate("/")
            } else {
                // unableLoginButton({button: 'login'})
                alert('[ERROR]: Invalid email or password. Try again.')
            }
        })
        .catch((err) => {
            console.error(err)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <div className={`${style.container} ${isSignIn ? style.signInJs : style.signUpJs}`}>
            <div className={`${style.content} ${style.firstContent}`}>
                <div className={style.firstColumn}>
                    <h2 className={`${style.title} ${style.titlePrimary}`}>Welcome Back!</h2>
                    <p className={style.descriptionPrimary}>To keep connected with us</p>
                    <p className={style.descriptionPrimary}>please login with your personal info.</p>  
                    <button 
                        id="signin" 
                        className={`${style.btn} ${style.btnPrimary}`}
                        onClick={handleSignInSignUpClick}
                    >Sign in</button>
                </div> 
    
                <div className={style.secondColumn}>
                    <h2 className={`${style.title} ${style.titleH2}`}>Create Account</h2>
                    <div className={style.socialMedia}>
                        <ul className={style.listSocialMedia}>
                            <a className={style.linkSocialMedia} href="#">
                                <li className={style.itemSocialMedia}><i className={`${style.faBrands} ${style.faFacebook}`}></i>
                                </li>
                            </a>   
                            <a className={style.linkSocialMedia} href="#">
                                <li className={style.itemSocialMedia}><i className={`${style.faBrands} ${style.faGooglePlusG}`}></i>
                                </li>
                            </a> 
                            <a className={style.linkSocialMedia} href="#">
                                <li className={style.itemSocialMedia}><i className={`${style.faBrands} ${style.faLinkedin}`}></i>
                                </li>
                            </a>
                        </ul>
                    </div>
    
                    <p className={style.descriptionSecond}>or use your email for registration:</p>  
                    <form className={style.form}>
                        <label className={style.labelInput}>
                            <i className= {`${style.faRegular} ${style.faUser} ${style.iconModify}`}></i>
                            <input 
                                type="text" 
                                placeholder="Name" 
                                id="name" 
                                minLength="2" 
                                maxLength="60"
                                onChange={handleSignupName}
                            />
                        </label>
    
                        <label className= {style.labelInput}>
                            <i className={`${style.faRegular} ${style.faEnvelope} ${style.iconModify}`}></i>
                            <input 
                                type="email" 
                                placeholder="Email" 
                                id="sign-up-email" 
                                required
                                onChange={handleSignupEmail}
                            />
                        </label>
    
                        <label className={style.labelInput}>
                            <i className={`${style.faSolid} ${style.faLock} ${style.iconModify}`}></i>
                            <input 
                                type="password" 
                                id="password-right" 
                                placeholder="Password" 
                                autoComplete="new-password" 
                                minLength="8"
                                maxLength="40"
                                onChange={handleSignupPassword}
                            />
    
                            <div className={style.showPassword}>
                                <i className={`${style.faSolid} ${style.faEyeSlash}`} id="show-password-right" onClick={showPasswordSignUp}></i> 
                            </div>
    
                        </label>                    
                    
                        <button 
                            type="button" 
                            className={`${style.btn} ${style.btnSecond}`} 
                            onClick={signUp} 
                            id="sign-up-button"
                        >Sign up</button>
                    </form>
                </div>
            </div>
    
            <div className={`${style.content} ${style.secondContent}`}>
                <div className={style.firstColumn}>
                    <h2 className={`${style.title} ${style.titlePrimary}`}>Hello, friend!</h2>
                    <p className={style.descriptionPrimary}>Enter your personal details</p>
                    <p className={style.descriptionPrimary}>and start a journey with us.</p>  
                    <button 
                        id="signup" 
                        className={`${style.btn} ${style.btnPrimary}`}
                        onClick={handleSignInSignUpClick}
                    >Sign up</button>
                </div> 
    
                <div className={style.secondColumn}>
                    <h2 className={`${style.title} ${style.titleH2}`}>Sign in</h2>
                    <div className={style.socialMedia}>
                        <ul className={style.listSocialMedia}>
                            <a className={style.linkSocialMedia} href="#">
                                <li className={style.itemSocialMedia}><i className={`${style.faBrands} ${style.faFacebook}`}></i>
                                </li>
                            </a>   
                            <a className={style.linkSocialMedia} href="#">
                                <li className={style.itemSocialMedia}><i className={`${style.faBrands} ${style.faGooglePlusG}`}></i>
                                </li>
                            </a> 
                            <a className={style.linkSocialMedia} href="#">
                                <li className={style.itemSocialMedia}><i className={`${style.faBrands} ${style.faLinkedin}`}></i>
                                </li>
                            </a>
                        </ul>
                    </div>
    
                    <p className={style.descriptionSecond} >or use your email account:</p>  
                    <form className={style.form}>
                        <label className={style.labelInput}>
                            <i className={`${style.faRegular} ${style.faEnvelope} ${style.iconModify}`}></i>
                            <input 
                                type="email" 
                                placeholder="Email" 
                                id="login-email"
                                onChange={handleLoginEmail}
                            />
                        </label>
    
                        <label className={style.labelInput}>
                            <i className={`${style.faSolid} ${style.faLock} ${style.iconModify}`}></i>
                            <input 
                                type="password" 
                                id="password-left" 
                                placeholder="Password" 
                                autoComplete="new-password"
                                onChange={handleLoginPassword}
                            />
    
                            <div className={style.showPassword}>
                                <i className={`${style.faSolid} ${style.faEyeSlash}`} id="show-password-left" onClick={showPasswordSignIn}></i>   
                            </div>
                        </label> 
                        <a className={style.password} href="#">Forgot your password?</a>
                        <button 
                            type="button" 
                            className={`${style.btn} ${style.btnSecond}`} 
                            onClick={login}
                            id="login-button"
                        >{ isLoading ? <img src={spinner} className={style.buttonLoader} /> : 'Sign in'}</button>
                    </form>
                </div>
            </div>
        </div> 
    )
}

