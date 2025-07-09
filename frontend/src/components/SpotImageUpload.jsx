import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSpotImageThunk } from '../store/images';
import './SpotImageUpload.css';

const SpotImageUpload = ({ spotId, onSuccess }) => {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await dispatch(createSpotImageThunk(spotId, {
        url: imageUrl,
        preview: isPreview
      }));
      setImageUrl('');
      setIsPreview(false);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="spot-image-upload">
      <h3>Add Images</h3>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            placeholder="Enter image URL"
          />
        </div>
        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              checked={isPreview}
              onChange={(e) => setIsPreview(e.target.checked)}
            />
            Set as preview image
          </label>
        </div>
        <button type="submit" className="upload-button">
          Add Image
        </button>
      </form>
    </div>
  );
};

export default SpotImageUpload; 