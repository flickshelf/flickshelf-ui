import { useNavigate } from 'react-router-dom';

import { IconContext } from "react-icons";
import { IoLogOutOutline } from 'react-icons/io5';

import style from "./Header.module.css"

import logo from '../assets/temp-logo.png'

export function Header() {
	const navigate = useNavigate()

	const openRegisterPage = () => {
		navigate("/")
	}

	const openListMoviesPage = () => {}

	const openListSeriesPage = () => {
		navigate("/list")
	}

	const logout = () => {}

    return (
		<header>
			<a onClick={openRegisterPage}>
				<img className={style.logotipo} src={logo} alt="FlickShelf logo" />
			</a>
			<div className={style.darkBlueHeader}>
				<nav id="navigation">
					<ul>
						<input className={style.registerBtn} type="button" value="Register" onClick={openRegisterPage} />
						<input className={style.mListBtn} type="button" value="Movies list" onClick={openListMoviesPage} />
						<input className={style.sListBtn} type="button" value="Series list" onClick={openListSeriesPage} /> 

						<button className={style.logoutBtn} onClick={logout}>
							<IconContext.Provider value={{ className: style.headerIcon }}>
								<IoLogOutOutline 
									title={'test'}
								/>
							</IconContext.Provider>
						</button>
					</ul>
				</nav>
			</div>
		</header>
    )
}
