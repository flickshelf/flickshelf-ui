import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Home } from './pages/Home'
import { List } from './pages/List'
import { UpdateSerie } from './pages/UpdateSerie'
import { Login } from './pages/Login'
import { UsersManagement } from './pages/UsersManagement'
import { Navigate } from 'react-router-dom'

const user = JSON.parse(localStorage.getItem('loggedUser'))

export function AppRoutes () {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/list" element={<List />} />
                <Route path="/update-serie" element={<UpdateSerie />} />
                <Route path="/login" element={<Login />} />
                {user.role === 'ADMIN' && <Route path="/users-management" element={<UsersManagement />} />}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    )
}
