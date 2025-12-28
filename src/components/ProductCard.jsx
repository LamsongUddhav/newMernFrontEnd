import { Star, ShoppingCart } from 'lucide-react'

function ProductCard({ product }) {
  const imageUrl = product.images?.[0]?.url || 'https://via.placeholder.com/300x200/7c3aed/ffffff?text=No+Image'

  return (
    <div className="product-card">
      <div className="product-image">
        <div className="product-badge-line"></div>
        <img src={imageUrl} alt={product.name} />
        
        {product.stock === 0 && (
          <span className="badge badge-danger">Out of Stock</span>
        )}
        {product.stock > 0 && product.stock < 10 && (
          <span className="badge badge-warning">Low Stock</span>
        )}
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-rating">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
          ))}
          <span>(4.8)</span>
        </div>

        <div className="product-bottom">
          <span className="product-price">Rs. {product.price.toLocaleString()}</span>
          <span className="product-stock">Stock: {product.stock}</span>
        </div>

        <button 
          className="add-to-cart-btn"
          disabled={product.stock === 0}
        >
          <ShoppingCart size={20} />
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}

export default ProductCard