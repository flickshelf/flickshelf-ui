import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Login.module.css'

import axios from 'axios';

export function Login() {
    const navigate = useNavigate()
    
    const [isSignIn, setIsSignIn] = useState(false);

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [signupEmail, setSignupEmail] = useState('');

    const handleSignInSignUpClick = () => {
        setIsSignIn(!isSignIn)
    }

    const handleLoginEmail = (event) => {
        setLoginEmail(event.target.value)
        console.log(loginEmail)
    }

    const handleLoginPassword = (event) => {
        setLoginPassword(event.target.value)
        console.log(loginPassword)
    }

    const login = () => {
        // disableLoginButton({ button: 'login' })
        // showLoginLoadingSpinner({ button: 'login' })

        axios.post('https://api.flickshelf.com/login', {
            loginEmail,
            loginPassword
        }).then((res) => {
            console.log(res.data)
            const userId = res.data

            if (userId) {
                // storeUserCredentialsOnBrowser(userId)
                
                console.log('navigate("/")')
                return navigate("/")
            } else {
                // unableLoginButton({button: 'login'})
                alert('[ERROR]: Invalid email or password. Try again.')
            }
        })
        .catch((err) => {
            console.error(err)
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
                        <label className={style.labelInput} for="">
                            <i className= {`${style.faRegular} ${style.faUser} ${style.iconModify}`}></i>
                            <input 
                            type="text" 
                            placeholder="Name" 
                            id="name" 
                            minlength="2" 
                            maxlength="60"/>
                        </label>
    
                        <label className= {style.labelInput} for="">
                            <i className={`${style.faRegular} ${style.faEnvelope} ${style.iconModify}`}></i>
                            <input 
                                type="email" 
                                placeholder="Email" 
                                id="sign-up-email" 
                                required
                            />
                        </label>
    
                        <label className={style.labelInput} for="">
                            <i className={`${style.faSolid} ${style.faLock} ${style.iconModify}`}></i>
                            <input 
                                type="password" 
                                id="password-right" 
                                placeholder="Password" 
                                autocomplete="new-password" 
                                minlength="8"
                                maxlength="40"
                            />
    
                            <div className={style.showPassword}>
                                <i className={`${style.faSolid} ${style.faEyeSlash}`} id="show-password-right" onclick="showPasswordSignUp()"></i> 
                            </div>
    
                        </label>                    
                    
                        <button 
                            type="button" 
                            className={`${style.btn} ${style.btnSecond}`} 
                            onclick="signUp()" 
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
                        <label className={style.labelInput} for="">
                            <i className={`${style.faRegular} ${style.faEnvelope} ${style.iconModify}`}></i>
                            <input 
                                type="email" 
                                placeholder="Email" 
                                id="login-email"
                                onChange={handleLoginEmail}
                            />
                        </label>
    
                        <label className={style.labelInput} for="">
                            <i className={`${style.faSolid} ${style.faLock} ${style.iconModify}`}></i>
                            <input 
                                type="password" 
                                id="password-left" 
                                placeholder="Password" 
                                autocomplete="new-password"
                                onChange={handleLoginPassword}
                            />
    
                            <div className={style.showPassword}>
                                <i className={`${style.faSolid} ${style.faEyeSlash}`} id="show-password-left" onclick="showPasswordSignIn()"></i>   
                            </div>
                        </label> 
                        <a className={style.password} href="#">Forgot your password?</a>
                        <button 
                            type="button" 
                            className={`${style.btn} ${style.btnSecond}`} 
                            onClick={login}
                            id="login-button"
                        >Sign in</button>
                    </form>
                </div>
            </div>
        </div> 
    )
}

