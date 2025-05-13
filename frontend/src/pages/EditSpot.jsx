import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSpotById, updateSpot } from '../store/spots';
import './CreateSpot.css'; // Reusing CreateSpot styles

const EditSpot = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { spotId } = useParams();
  
  const spot = useSelector(state => state.spots.singleSpot);
  const error = useSelector(state => state.spots.error);
  const status = useSelector(state => state.spots.status);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    address: '',
    city: '',
    state: '',
    country: '',
    previewImage: '',
    images: ['', '', '', '']
  });

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    dispatch(fetchSpotById(spotId));
  }, [dispatch, spotId]);

  useEffect(() => {
    if (spot && status === 'succeeded') {
      setFormData({
        name: spot.name || '',
        description: spot.description || '',
        price: spot.price ? String(spot.price) : '',
        address: spot.address || '',
        city: spot.city || '',
        state: spot.state || '',
        country: spot.country || '',
        previewImage: spot.images?.[0] || '',
        images: [
          spot.images?.[1] || '',
          spot.images?.[2] || '',
          spot.images?.[3] || '',
          spot.images?.[4] || ''
        ]
      });
    }
  }, [spot, status]);

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

      await dispatch(updateSpot({ id: spotId, ...spotData }));
      navigate(`/spots/${spotId}`);
    } catch (error) {
      // Error is handled by the reducer
    }
  };

  if (status === 'loading') {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading spot details...</p>
      </div>
    );
  }

  return (
    <div className="create-spot-container">
      <div className="create-spot-form-container">
        <h1>Edit Your Spot</h1>
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
            Update Spot
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSpot; 