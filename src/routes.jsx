import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Home } from './pages/Home'
import { List } from './pages/List'

export function AppRoutes () {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/list" element={<List />} />
                {/* <Route path="/login" element={<Login />} /> */}
            </Routes>
        </Router>
    )
}
