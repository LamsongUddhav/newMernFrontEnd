import { useState, useEffect } from 'react'
import { Package, Plus, Edit2, Trash2, DollarSign, TrendingUp, Star } from 'lucide-react'
import api from '../services/api'
import ProductModal from '../components/ProductModal'

function ProductController() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editProduct, setEditProduct] = useState(null)

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
      alert('Failed to load products')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('⚠️ Are you sure you want to delete this product?')) return

    try {
      await api.delete(`/products/${id}`)
      setProducts(products.filter(p => p._id !== id))
      alert('✅ Product deleted successfully!')
    } catch (error) {
      console.error('Error deleting:', error)
      alert('❌ Error deleting product')
    }
  }

  const totalProducts = products.length
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0)
  const lowStock = products.filter(p => p.stock < 10 && p.stock > 0).length
  const uniqueCategories = [...new Set(products.map(p => p.category))].length

  return (
    <div className="admin-page">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-logo">
            <div className="logo">
              <Package size={28} />
            </div>
            <div>
              <h1>Product Controller</h1>
              <p>Manage your robotics inventory</p>
            </div>
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => {
              setEditProduct(null)
              setShowModal(true)
            }}
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>
      </header>

      <div className="admin-content">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card stat-blue">
            <div className="stat-info">
              <p>Total Products</p>
              <h3>{totalProducts}</h3>
            </div>
            <div className="stat-icon">
              <Package size={32} />
            </div>
          </div>

          <div className="stat-card stat-green">
            <div className="stat-info">
              <p>Total Inventory Value</p>
              <h3>Rs. {totalValue.toLocaleString()}</h3>
            </div>
            <div className="stat-icon">
              <DollarSign size={32} />
            </div>
          </div>

          <div className="stat-card stat-orange">
            <div className="stat-info">
              <p>Low Stock Items</p>
              <h3>{lowStock}</h3>
            </div>
            <div className="stat-icon">
              <TrendingUp size={32} />
            </div>
          </div>

          <div className="stat-card stat-purple">
            <div className="stat-info">
              <p>Categories</p>
              <h3>{uniqueCategories}</h3>
            </div>
            <div className="stat-icon">
              <Star size={32} />
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="products-table-container">
          <div className="table-header">
            <h2>📦 Product Management</h2>
          </div>

          {loading ? (
            <div className="spinner"></div>
          ) : products.length > 0 ? (
            <div className="table-wrapper">
              <table className="products-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id}>
                      <td>
                        <div className="product-cell">
                          <img
                            src={product.images?.[0]?.url || 'https://via.placeholder.com/50'}
                            alt={product.name}
                          />
                          <div>
                            <div className="product-name">{product.name}</div>
                            <div className="product-desc">{product.description}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="category-badge">{product.category}</span>
                      </td>
                      <td className="price-cell">Rs. {product.price.toLocaleString()}</td>
                      <td>
                        <span className={`stock-badge ${
                          product.stock === 0 ? 'stock-danger' :
                          product.stock < 10 ? 'stock-warning' :
                          'stock-success'
                        }`}>
                          {product.stock} units
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button
                            className="action-btn edit-btn"
                            onClick={() => {
                              setEditProduct(product)
                              setShowModal(true)
                            }}
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            className="action-btn delete-btn"
                            onClick={() => handleDelete(product._id)}
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <p>No products yet</p>
              <span>Click "Add Product" to get started</span>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <ProductModal
          product={editProduct}
          onClose={() => {
            setShowModal(false)
            setEditProduct(null)
          }}
          onSave={loadProducts}
        />
      )}
    </div>
  )
}

export default ProductController