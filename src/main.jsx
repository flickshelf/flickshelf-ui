import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Card } from './components/Card'
import { Form } from './components/Form'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Card />
    <Form />
  </StrictMode>,
)
