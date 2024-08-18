import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const productsPerPage = 8;
  const authToken = localStorage.getItem('authToken'); // Use token from local storage
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) {
      navigate('/login'); // Redirect to login if no auth token
      return;
    }

    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://intern-task-api.bravo68web.workers.dev/api/products', {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });

        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
      }
    };

    fetchProducts();
  }, [authToken, navigate]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const nextPage = () => setCurrentPage(prevPage => prevPage + 1);
  const prevPage = () => setCurrentPage(prevPage => prevPage - 1);

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear the auth token from local storage
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="product-grid">
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {error && <p>{error}</p>}
      <div className="products">
        {currentProducts.length > 0 ? (
          currentProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.thumbnail} alt={product.title} />
              <h3>{product.title}</h3>
              <span className="price-tag">${product.price}</span>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button onClick={nextPage} disabled={indexOfLastProduct >= filteredProducts.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductGrid;
