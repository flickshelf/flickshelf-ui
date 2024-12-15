import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Home } from './pages/Home'
import {List} from './pages/List'

createRoot(document.getElementById('root')).render(
  <Router>
      <Home />
  </Router>
)

