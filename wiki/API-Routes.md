# API Routes Documentation

## Authentication Endpoints

### POST /api/auth/signup
Create a new user account.
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "password": "string"
}
```

### POST /api/auth/login
Log in an existing user.
```json
{
  "email": "string",
  "password": "string"
}
```

### POST /api/auth/logout
Log out the current user.

## Spots Endpoints

### GET /api/spots
Get all spots.
- Query Parameters:
  - page (optional): Page number
  - size (optional): Items per page
  - minPrice (optional): Minimum price filter
  - maxPrice (optional): Maximum price filter

### GET /api/spots/:id
Get details of a specific spot.

### POST /api/spots
Create a new spot.
```json
{
  "name": "string",
  "description": "string",
  "price": "number",
  "address": "string",
  "city": "string",
  "state": "string",
  "country": "string",
  "previewImage": "string (URL)",
  "images": ["string (URL)"]
}
```

### PUT /api/spots/:id
Update a spot.
```json
{
  "name": "string",
  "description": "string",
  "price": "number",
  "address": "string",
  "city": "string",
  "state": "string",
  "country": "string",
  "previewImage": "string (URL)",
  "images": ["string (URL)"]
}
```

### DELETE /api/spots/:id
Delete a spot.

## Reviews Endpoints

### GET /api/spots/:spotId/reviews
Get all reviews for a spot.

### POST /api/spots/:spotId/reviews
Create a review for a spot.
```json
{
  "rating": "number (1-5)",
  "content": "string"
}
```

### DELETE /api/reviews/:reviewId
Delete a review.

## Users Endpoints

### GET /api/users/me
Get the current user's information.

### GET /api/users/:userId/spots
Get all spots owned by a specific user.

### GET /api/users/:userId/reviews
Get all reviews written by a specific user. 