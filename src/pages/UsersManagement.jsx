import style from './UsersManagement.module.css'

import { Header } from '../components/Header'

export const UsersManagement = () => {
    return (
        <>
            <Header />

            <div className={style.usersManagementGeneralContainer}>
                <h2 className={style.pageTitle}>Users Management</h2>
            </div>
        </>
    )
}
