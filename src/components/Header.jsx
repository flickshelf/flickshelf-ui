import { useNavigate } from 'react-router-dom';

import { IconContext } from "react-icons";
import { IoLogOutOutline } from 'react-icons/io5';

import style from "./Header.module.css"

import logo from '../assets/temp-logo.png'
import anniversaryBadge from '../assets/1st-year-anniversary.png'

export function Header() {
	const navigate = useNavigate()

	const user = JSON.parse(localStorage.getItem('loggedUser'))

	const openRegisterPage = () => {
		navigate("/")
	}

	const openListMoviesPage = () => {}

	const openListSeriesPage = () => {
		navigate("/list")
	}

	const logout = () => {
  		const didConfirm = confirm('You are going to be logged out')

		if (didConfirm) {
			localStorage.removeItem('loggedUser')
			navigate("/login")
 		}
	}

	const handleClickLogo = () => {
		navigate("/")
	}

	const openUsersManagementPage = () => {
		navigate("/users-management")
	}

    return (
		<header>
			<a onClick={openRegisterPage}>
				<img className={style.logotipo} src={logo} alt="FlickShelf logo" onClick={handleClickLogo}/>
			</a>
			<img src={anniversaryBadge} alt="1st year anniversary badge" className={style.anniversaryBadge} />
			<div className={style.darkBlueHeader}>
				<nav id="navigation">
					<ul>
						{user?.role === 'ADMIN' && <input className={style.sListBtn} type="button" value="Users management" onClick={openUsersManagementPage} />}
						<input className={style.registerBtn} type="button" value="Register" onClick={openRegisterPage} />
						{/* <input className={style.mListBtn} type="button" value="Movies list" onClick={openListMoviesPage} /> */}
						<input className={style.sListBtn} type="button" value="Series list" onClick={openListSeriesPage} /> 

						<button className={style.logoutBtn} onClick={logout}>
							<IconContext.Provider value={{ className: style.headerIcon }}>
								<IoLogOutOutline 
									title={'Logout'}
								/>
							</IconContext.Provider>
						</button>
					</ul>
				</nav>
			</div>
		</header>
    )
}
