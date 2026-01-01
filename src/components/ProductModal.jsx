import { useState, useEffect } from 'react'
import { X, Upload } from 'lucide-react'
import api from '../services/api'

function ProductModal({ product, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Drones',
    stock: '',
    features: '',
  })
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || 'Drones',
        stock: product.stock || '',
        features: product.features?.join(', ') || '',
      })
    }
  }, [product])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = new FormData()
      
      // Append text fields
      data.append('name', formData.name)
      data.append('description', formData.description)
      data.append('price', formData.price)
      data.append('category', formData.category)
      data.append('stock', formData.stock)
      data.append('features', formData.features)
      data.append('specifications', JSON.stringify({}))

      // Append images - IMPORTANT: use 'images' as field name (matches backend)
      if (images && images.length > 0) {
        images.forEach(image => {
          data.append('images', image)
        })
      }

      let response
      if (product) {
        // Update existing product
        response = await api.put(`/products/${product._id}`, data)
        alert('✅ Product updated successfully!')
      } else {
        // Create new product
        response = await api.post('/products', data)
        alert('✅ Product created successfully!')
      }

      console.log('Response:', response.data)
      onSave()
      onClose()
    } catch (error) {
      console.error('Error saving product:', error)
      console.error('Error details:', error.response?.data)
      alert(`❌ Error: ${error.response?.data?.message || error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{product ? '✏️ Edit Product' : '➕ Add New Product'}</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Product Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Industrial Robot Arm"
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              required
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your product..."
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price (Rs.) *</label>
              <input
                type="number"
                required
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label>Stock *</label>
              <input
                type="number"
                required
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                placeholder="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="Drones">Drones</option>
              <option value="Robotic Arms">Robotic Arms</option>
              <option value="Sensors">Sensors</option>
              <option value="Kits">Kits</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Features (comma-separated)</label>
            <input
              type="text"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              placeholder="6-axis movement, High precision, Easy setup"
            />
          </div>

          <div className="form-group">
            <label>Product Images (Max 5)</label>
            <div className="file-upload">
              <Upload size={40} />
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => setImages(Array.from(e.target.files))}
                id="file-upload"
              />
              <label htmlFor="file-upload">Click to upload images</label>
              <p>PNG, JPG, GIF up to 5MB each</p>
              {images.length > 0 && (
                <p className="file-count">✓ {images.length} file(s) selected</p>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? '⏳ Saving...' : (product ? '💾 Update' : '✨ Create')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductModal