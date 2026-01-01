import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Product from './pages/Product'
import ProductController from './pages/ProductController'
import './styles/theme.css'
import './styles/main.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/products" element={<Product />} />
        <Route path="/admin" element={<ProductController />} />
      </Routes>
    </Router>
  )
}

export default App