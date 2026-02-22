
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductPage.css';

// Import images - same as App.js
import iphone from '../images/iphone-14.jpg';
import samsung from '../images/samsung-s23.jpg';
import oneplus from '../images/oneplus-11.jpg';

function ProductPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [emiPlans, setEmiPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // States for selected options
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('256GB');
  const [selectedRam, setSelectedRam] = useState('8GB');

  // Color options array
  const colorOptions = [
    { name: 'Silver', color: '#c0c0c0' },
    { name: 'Cosmic Orange', color: '#ff6b35' },
    { name: 'Deep Blue', color: '#1e4b7c' }
  ];

  // Storage + RAM combined options (SIRF YEH SECTION CHANGE HOGA)
  const variantOptions = [
    { storage: '128GB', ram: '6GB' },
    { storage: '128GB', ram: '8GB' },
    { storage: '256GB', ram: '8GB' },
    { storage: '256GB', ram: '12GB' },
    { storage: '512GB', ram: '12GB' },
    { storage: '512GB', ram: '16GB' },
    { storage: '1TB', ram: '16GB' }
  ];

  useEffect(() => {
    fetchProductData();
  }, [slug]);

  const fetchProductData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/${slug}`);
      setProduct(response.data.product);
      setSelectedColor(response.data.product.color);
      setSelectedStorage(response.data.product.storage);
      setEmiPlans(response.data.emiPlans);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching product:', error);
      setLoading(false);
    }
  };

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
  };

  const handleProceed = () => {
    if (selectedPlan) {
      alert(`Proceeding with ${selectedPlan.tenure} months EMI plan`);
    } else {
      alert('Please select an EMI plan');
    }
  };

  // Handle variant selection
  const handleVariantSelect = (storage, ram) => {
    setSelectedStorage(storage);
    setSelectedRam(ram);
  };

  // Check if variant is selected
  const isVariantSelected = (storage, ram) => {
    return selectedStorage === storage && selectedRam === ram;
  };

  // Image select function
  const getProductImage = () => {
    if (slug.includes('iphone')) {
      return iphone;
    } else if (slug.includes('samsung')) {
      return samsung;
    } else if (slug.includes('oneplus')) {
      return oneplus;
    }
    return iphone;
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <div className="product-page">
      <div className="product-container">
        <div className="product-image-section">
          <div className="badge-container">
            <span className="new-badge">NEW</span>
            <span className="product-name-bold">{product.name}</span>   
          </div>
          <img 
            src={getProductImage()} 
            alt={product.name} 
            className="product-image" 
          />
        </div>

        <div className="product-details-section">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-variant">{product.storage} • {product.color}</p>
          
          {/* COLOR VARIANT SECTION - WAISA HI */}
          <div className="color-variant-section">
            <div className="variant-label">
              <span className="label-title">Color</span>
              <span className="selected-color">{selectedColor}</span>
            </div>
            
            <div className="color-options">
              {colorOptions.map((color, index) => (
                <div 
                  key={index}
                  className={`color-option ${selectedColor === color.name ? 'active' : ''}`}
                  onClick={() => setSelectedColor(color.name)}
                >
                  <span className="color-dot" style={{backgroundColor: color.color}}></span>
                  <span className="color-name">{color.name}</span>
                  {selectedColor === color.name && <span className="check-mark">✔</span>}
                </div>
              ))}
            </div>
          </div>

          {/*  STORAGE + RAM COMBINED SECTION -  */}
          <div className="storage-variant-section">
            <div className="variant-label">
              <span className="label-title">Variant</span>
            </div>
            
            <div className="combined-variant-options">
              {variantOptions.map((variant, index) => (
                <div 
                  key={index}
                  className={`combined-variant-card ${isVariantSelected(variant.storage, variant.ram) ? 'active' : ''}`}
                  onClick={() => handleVariantSelect(variant.storage, variant.ram)}
                >
                  <div className="variant-details">
                    <span className="variant-storage">{variant.storage}</span>
                    <span className="variant-ram">{variant.ram} RAM</span>
                  </div>
                  {isVariantSelected(variant.storage, variant.ram) && (
                    <span className="check-mark">✔</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Price Section */}
          <div className="price-section">
            <span className="current-price">₹{product.price.toLocaleString()}</span>
            <span className="original-price">₹{product.mrp.toLocaleString()}</span>
          </div>
          
          <p className="emi-tagline">EMI plans backed by mutual funds</p>

          {/* EMI Plans */}
          <div className="emi-plans-list">
            {emiPlans.map((plan, index) => (
              <div 
                key={index}
                className={`emi-plan-item ${selectedPlan?._id === plan._id ? 'selected' : ''}`}
                onClick={() => handlePlanSelect(plan)}
              >
                <div className="plan-main">
                  <span className="monthly-amount">₹{plan.monthlyAmount.toLocaleString()} x {plan.tenure} months</span>
                  <span className={`interest-rate ${plan.interestRate === '0%' ? 'zero' : 'high'}`}>
                    {plan.interestRate} Interest
                  </span>
                </div>
                <div className="cashback-info">
                  Additional cashback of ₹{plan.cashback.toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          <button 
            className="proceed-button"
            onClick={handleProceed}
          >
            Proceed with Selected Plan
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;


