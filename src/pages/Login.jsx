import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Login.module.css'

import { IconContext } from "react-icons";
import { IoLogoFacebook, IoLogoGoogle, IoLogoLinkedin } from "react-icons/io5";
import axios from 'axios';

import spinner from '../assets/white-button-spinner.gif'

const IS_PROD_ENV = import.meta.env.VITE_ENV === 'prod'
const baseUrl = IS_PROD_ENV ? 'https://api.flickshelf.com' : 'http://localhost:3333'

export function Login() {
    const navigate = useNavigate()
    
    const [isSignIn, setIsSignIn] = useState(false);

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [signupName, setSignupName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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
        setIsLoading(true)
        setIsButtonDisabled(true)

        axios.post(`${baseUrl}/signup`, {
            name: signupName,
            signUpEmail: signupEmail, 
            signUpPassword: signupPassword
        }).then(() => {
            alert(`User ${signupName} created successfully!`)
            goToLoginSection()
        }).catch(() => {
            alert('There was an error. Try again.')
        }).finally(() => {
            setIsLoading(false)
            setIsButtonDisabled(false)
        })
    } 

    const goToLoginSection = () => {
        setSignupName('')
        setSignupEmail('')
        setSignupPassword('')
        
        const container = document.querySelector(`.${style.container}`)
        container.classList.remove(style.signUpJs)
        container.classList.add(style.signInJs)
    }

    const showPasswordSignIn = () => {}

    const storeUserCredentialsOnBrowser = (user) => {
        localStorage.setItem('loggedUser', JSON.stringify({
            id: user.id,
            role: user.role
        }))
    }

    const login = () => {
        setIsLoading(true);
        setIsButtonDisabled(true);

        axios.post(`${baseUrl}/login`, {
            loginEmail,
            loginPassword
        }).then((res) => {
            const user = res.data

            if (user.id) {
                storeUserCredentialsOnBrowser(user)

                return navigate("/")
            } else {
                alert('[ERROR]: Invalid email or password. Try again.')
            }
        })
        .catch((err) => {
            console.error(err)
        })
        .finally(() => {
            setIsLoading(false)
            setIsButtonDisabled(false);
        })
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            login()
        } 
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
                                <li className={style.itemSocialMedia}>
                                    <IconContext.Provider value={{}}>
                                        <IoLogoFacebook />
                                    </IconContext.Provider>
                                </li>
                            </a>   
                            <a className={style.linkSocialMedia} href="#">
                                <li className={style.itemSocialMedia}>
                                    <IconContext.Provider value={{}}>
                                        <IoLogoGoogle />
                                    </IconContext.Provider>
                                </li>
                            </a> 
                            <a className={style.linkSocialMedia} href="#">
                                <li className={style.itemSocialMedia}>
                                    <IconContext.Provider value={{}}>
                                        <IoLogoLinkedin />
                                    </IconContext.Provider>
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
                            className={`${style.btn} ${style.btnSecond} ${isButtonDisabled ? style.disabled : ''}`} 
                            onClick={signUp} 
                            id="sign-up-button"
                        >
                            { isLoading ? <img src={spinner} className={style.buttonLoader} /> : 'Sign up'}
                        </button>
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
                                <li className={style.itemSocialMedia}>
                                <IconContext.Provider value={{}}>
                                        <IoLogoFacebook />
                                    </IconContext.Provider>
                                </li>
                            </a>   
                            <a className={style.linkSocialMedia} href="#">
                                <li className={style.itemSocialMedia}>
                                    <IconContext.Provider value={{}}>
                                        <IoLogoGoogle />
                                    </IconContext.Provider>
                                </li>
                            </a> 
                            <a className={style.linkSocialMedia} href="#">
                                <li className={style.itemSocialMedia}>
                                    <IconContext.Provider value={{}}>
                                        <IoLogoLinkedin />
                                    </IconContext.Provider>
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
                                onKeyDown={handleKeyPress}
                            />
    
                            <div className={style.showPassword}>
                                <i className={`${style.faSolid} ${style.faEyeSlash}`} id="show-password-left" onClick={showPasswordSignIn}></i>   
                            </div>
                        </label> 
                        <a className={style.password} href="#">Forgot your password?</a>
                        <button 
                            type="button" 
                            className={`${style.btn} ${style.btnSecond} ${isButtonDisabled ? style.disabled : ''}`} 
                            onClick={login}
                            id="login-button"
                        >{ isLoading ? <img src={spinner} className={style.buttonLoader} /> : 'Sign in'}</button>
                    </form>
                </div>
            </div>
        </div> 
    )
}
