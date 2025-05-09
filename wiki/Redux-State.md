# Redux State Structure

## Session Slice
```javascript
{
  session: {
    user: {
      id: number,
      firstName: string,
      lastName: string,
      email: string,
      createdAt: string,
      updatedAt: string
    } | null,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null
  }
}
```

## Spots Slice
```javascript
{
  spots: {
    allSpots: {
      [spotId: number]: {
        id: number,
        ownerId: number,
        name: string,
        description: string,
        price: number,
        address: string,
        city: string,
        state: string,
        country: string,
        previewImage: string,
        images: string[],
        avgRating: number,
        createdAt: string,
        updatedAt: string
      }
    },
    currentSpot: {
      id: number,
      ownerId: number,
      name: string,
      description: string,
      price: number,
      address: string,
      city: string,
      state: string,
      country: string,
      previewImage: string,
      images: string[],
      avgRating: number,
      reviews: number[],
      createdAt: string,
      updatedAt: string
    } | null,
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null
  }
}
```

## Reviews Slice
```javascript
{
  reviews: {
    reviews: {
      [reviewId: number]: {
        id: number,
        userId: number,
        spotId: number,
        rating: number,
        content: string,
        User: {
          id: number,
          firstName: string,
          lastName: string,
          profileImage: string
        },
        createdAt: string,
        updatedAt: string
      }
    },
    status: 'idle' | 'loading' | 'succeeded' | 'failed',
    error: string | null
  }
}
```

## Actions and Thunks

### Session Actions
- `login(credentials)`
- `signup(userData)`
- `logout()`
- `restoreUser()`

### Spots Actions
- `fetchSpots()`
- `fetchSpotById(spotId)`
- `createSpot(spotData)`
- `updateSpot(spotId, spotData)`
- `deleteSpot(spotId)`

### Reviews Actions
- `fetchReviews(spotId)`
- `createReview(spotId, reviewData)`
- `deleteReview(reviewId)`

## Selectors

### Session Selectors
- `selectCurrentUser(state)`
- `selectSessionStatus(state)`
- `selectSessionError(state)`

### Spots Selectors
- `selectAllSpots(state)`
- `selectSpotById(state, spotId)`
- `selectSpotsStatus(state)`
- `selectSpotsError(state)`

### Reviews Selectors
- `selectAllReviews(state)`
- `selectReviewsStatus(state)`
- `selectReviewsError(state)` 