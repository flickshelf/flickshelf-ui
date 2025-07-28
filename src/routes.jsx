import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Home } from './pages/Home'
import { List } from './pages/List'
import { UpdateSerie } from './pages/UpdateSerie'
import { Login } from './pages/Login'
import { UsersManagement } from './pages/UsersManagement'
import { About } from './pages/About'
import { Navigate } from 'react-router-dom'

export function AppRoutes () {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/list" element={<List />} />
                <Route path="/update-serie" element={<UpdateSerie />} />
                <Route path="/login" element={<Login />} />
                <Route path="/users-management" element={<UsersManagement />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    )
}
