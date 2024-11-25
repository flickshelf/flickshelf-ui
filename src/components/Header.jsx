import style from "./Header.module.css"

export function Header() {
    return (
		<header className={style.websiteHeader}>
			<a onClick="openRegisterPage()"><img id="logotipo" src="png/temp-logo.png" alt="FlickShelf logo"/></a>

			<div className={style.darkBlueHeader}>
				<div className={style.logo}>
				</div>
				<nav id="navigation">
				<ul>
					<input className={style.registerBtn} type="button" value="Register" onClick="openRegisterPage()"/>
					<input className={style.mListBtn} type="button" value="Movies list" onClick="openListMoviesPage()"/>
					<input className={style.sListBtn} type="button" value="Series list" onClick="openListSeriesPage()"/>  
					<div className={style.InputContainer}>
					<input className={style.logoutBtn} type="button" onClick="logout()" value=""/>
					<ion-icon name="log-out-outline" className={style.inputIcon}></ion-icon>
					</div>
				</ul>
				</nav>
			</div>
		</header>
    )
}
