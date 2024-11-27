import { LogOutOutline } from 'react-ionicons';

import style from "./Header.module.css"

import logo from '../assets/temp-logo.png'

export function Header() {
	const openRegisterPage = () => {}

	const openListMoviesPage = () => {}

	const openListSeriesPage = () => {}

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
							<LogOutOutline
								title={'test'}
								width="32px"
								color
							/>
						</button>
					</ul>
				</nav>
			</div>
		</header>
    )
}
