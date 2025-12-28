import { ShoppingCart, Search } from 'lucide-react'

function Navbar({ search, onSearchChange }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-section">
          
          <img src="logo high png.png" alt="Robotics Logo" className="logo-img" />
          <h1>ROBOTICS</h1>
        </div>

        <div className="search-bar">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search robotics products..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <button className="cart-button">
          <ShoppingCart size={24} />
        </button>
      </div>
    </header>
  )
}

export default Navbar