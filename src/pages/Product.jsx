import { useState, useEffect } from 'react'
import api from '../services/api'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'

function Product() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All Products')

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const response = await api.get('/products')
      if (response.data.success) {
        setProducts(response.data.data)
      }
    } catch (error) {
      console.error('Error loading products:', error)
      alert('Failed to load products. Make sure backend is running on port 50000')
    } finally {
      setLoading(false)
    }
  }

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'All Products' || p.category === category
    return matchSearch && matchCategory
  })

  const categories = ['All Products', 'Drones', 'Robotic Arms', 'Sensors', 'Kits', 'Other']

  return (
    <div className="user-page">
      <Navbar search={search} onSearchChange={setSearch} />

      <div className="banner">
        <div className="banner-content">
          <h2>Advanced Robotics for the Future</h2>
          <p>Discover cutting-edge robotics technology, from industrial automation to AI-powered solutions</p>
          <button className="btn btn-primary">Explore New Arrivals →</button>
        </div>
      </div>

      <div className="main-content">
        <aside className="sidebar">
          <div className="sidebar-section">
            <h3>Categories</h3>
            <ul>
              {categories.map(cat => (
                <li key={cat}>
                  <button
                    className={category === cat ? 'active' : ''}
                    onClick={() => setCategory(cat)}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-section">
            <h3>Price Range</h3>
            <ul>
              <li><button>Under Rs. 10,000</button></li>
              <li><button>Rs. 10,000 - Rs. 50,000</button></li>
              <li><button>Rs. 50,000 - Rs. 100,000</button></li>
              <li><button>Over Rs. 100,000</button></li>
            </ul>
          </div>
        </aside>

        <div className="products-section">
          <div className="products-header">
            <h2>{category} ({filtered.length})</h2>
            <select>
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Name: A to Z</option>
            </select>
          </div>

          {loading ? (
            <div className="spinner"></div>
          ) : filtered.length > 0 ? (
            <div className="products-grid">
              {filtered.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <p>No products found</p>
              <span>Try adjusting your search or filter</span>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Product