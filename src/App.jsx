import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Product from './pages/Product'
import './styles/theme.css'
import './styles/main.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/products" element={<Product />} />
      </Routes>
    </Router>
  )
}

export default App