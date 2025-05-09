import { API_BASE_URL as BASE_URL } from '../config';

// Helper function for making API calls
async function fetchData(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }

  return response.json();
}

// Spots API
export const spotsApi = {
  // Get all spots
  getAll: () => fetchData(`${BASE_URL}/spots`),

  // Get a single spot by ID
  getById: (id) => fetchData(`${BASE_URL}/spots/${id}`),

  // Create a new spot
  create: (spotData) => fetchData(`${BASE_URL}/spots`, {
    method: 'POST',
    body: JSON.stringify(spotData),
  }),

  // Update a spot
  update: (id, spotData) => fetchData(`${BASE_URL}/spots/${id}`, {
    method: 'PUT',
    body: JSON.stringify(spotData),
  }),

  // Delete a spot
  delete: (id) => fetchData(`${BASE_URL}/spots/${id}`, {
    method: 'DELETE',
  }),
};

// Reviews API
export const reviewsApi = {
  // Get reviews for a spot
  getBySpotId: (spotId) => fetchData(`${BASE_URL}/spots/${spotId}/reviews`),

  // Create a review
  create: (spotId, reviewData) => fetchData(`${BASE_URL}/spots/${spotId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(reviewData),
  }),

  // Delete a review
  delete: (reviewId) => fetchData(`${BASE_URL}/reviews/${reviewId}`, {
    method: 'DELETE',
  }),
}; 