import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSpotThunk } from '../store/spots';
import './CreateSpot.css';

const CreateSpot = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(state => state.spots.error);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    address: '',
    city: '',
    state: '',
    country: '',
    previewImage: '',
    images: ['', '', '', ''] // Additional images
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleImageChange = (index, value) => {
    if (index === -1) {
      // Preview image
      setFormData(prev => ({
        ...prev,
        previewImage: value
      }));
    } else {
      // Additional images
      setFormData(prev => ({
        ...prev,
        images: prev.images.map((img, i) => i === index ? value : img)
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }

    if (!formData.price) {
      errors.price = 'Price is required';
    } else if (isNaN(formData.price) || Number(formData.price) <= 0) {
      errors.price = 'Price must be a valid number greater than 0';
    }

    if (!formData.address.trim()) {
      errors.address = 'Address is required';
    }

    if (!formData.city.trim()) {
      errors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      errors.state = 'State is required';
    }

    if (!formData.country.trim()) {
      errors.country = 'Country is required';
    }

    if (!formData.previewImage.trim()) {
      errors.previewImage = 'Preview image is required';
    } else if (!isValidImageUrl(formData.previewImage)) {
      errors.previewImage = 'Please enter a valid image URL';
    }

    // Validate additional images if provided
    formData.images.forEach((img, index) => {
      if (img.trim() && !isValidImageUrl(img)) {
        errors[`image${index}`] = 'Please enter a valid image URL';
      }
    });

    return errors;
  };

  const isValidImageUrl = (url) => {
    if (!url) return true; // Empty URLs are handled by required field validation
    return url.match(/\.(jpg|jpeg|png|gif)$/i);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      // Filter out empty image URLs
      const filteredImages = formData.images.filter(img => img.trim());
      
      const spotData = {
        ...formData,
        price: Number(formData.price),
        images: [formData.previewImage, ...filteredImages]
      };

      const newSpot = await dispatch(createSpotThunk(spotData));
      navigate(`/spots/${newSpot.id}`);
    } catch (error) {
      // Error is handled by the reducer
    }
  };

  return (
    <div className="create-spot-container">
      <div className="create-spot-form-container">
        <h1>Create a New Spot</h1>
        <form onSubmit={handleSubmit} className="create-spot-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <div className="form-section">
            <h2>Basic Info</h2>
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name of your place"
                className={validationErrors.name ? 'error' : ''}
              />
              {validationErrors.name && (
                <span className="validation-error">{validationErrors.name}</span>
              )}
            </div>

            <div className="form-group">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description of your place"
                className={validationErrors.description ? 'error' : ''}
              />
              {validationErrors.description && (
                <span className="validation-error">{validationErrors.description}</span>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price per night"
                className={validationErrors.price ? 'error' : ''}
              />
              {validationErrors.price && (
                <span className="validation-error">{validationErrors.price}</span>
              )}
            </div>
          </div>

          <div className="form-section">
            <h2>Location</h2>
            <div className="form-group">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className={validationErrors.address ? 'error' : ''}
              />
              {validationErrors.address && (
                <span className="validation-error">{validationErrors.address}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className={validationErrors.city ? 'error' : ''}
                />
                {validationErrors.city && (
                  <span className="validation-error">{validationErrors.city}</span>
                )}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  className={validationErrors.state ? 'error' : ''}
                />
                {validationErrors.state && (
                  <span className="validation-error">{validationErrors.state}</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                className={validationErrors.country ? 'error' : ''}
              />
              {validationErrors.country && (
                <span className="validation-error">{validationErrors.country}</span>
              )}
            </div>
          </div>

          <div className="form-section">
            <h2>Images</h2>
            <div className="form-group">
              <input
                type="text"
                value={formData.previewImage}
                onChange={(e) => handleImageChange(-1, e.target.value)}
                placeholder="Preview Image URL (Required)"
                className={validationErrors.previewImage ? 'error' : ''}
              />
              {validationErrors.previewImage && (
                <span className="validation-error">{validationErrors.previewImage}</span>
              )}
            </div>

            {formData.images.map((image, index) => (
              <div key={index} className="form-group">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => handleImageChange(index, e.target.value)}
                  placeholder={`Image URL ${index + 1} (Optional)`}
                  className={validationErrors[`image${index}`] ? 'error' : ''}
                />
                {validationErrors[`image${index}`] && (
                  <span className="validation-error">{validationErrors[`image${index}`]}</span>
                )}
              </div>
            ))}
          </div>

          <button type="submit" className="submit-button">
            Create Spot
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSpot; 