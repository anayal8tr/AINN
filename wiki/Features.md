# Features Documentation

## MVP Features

### 1. Spots (Full CRUD)
The Spots feature is the primary feature of AInnBnB, allowing users to manage property listings.

#### Create
- Users can create new spot listings
- Required information:
  - Name
  - Description
  - Price per night
  - Location (address, city, state, country)
  - Preview image
  - Additional images (optional)
- Form validation ensures all required fields are filled
- Image URL validation

#### Read
- Users can view all available spots on the home page
- Grid layout with spot cards showing:
  - Preview image
  - Location
  - Price per night
  - Average rating
- Detailed view for individual spots showing:
  - All spot information
  - Image gallery
  - Reviews
  - Booking options (future feature)

#### Update
- Spot owners can edit their listings
- All fields can be updated
- Form pre-populated with current values
- Validation same as creation

#### Delete
- Spot owners can delete their listings
- Confirmation required before deletion
- Cascading deletion of related data (reviews, bookings)

### 2. Reviews (CRD)
The Reviews feature allows users to share their experiences at different spots.

#### Create
- Users can leave reviews on spots they've visited
- Required information:
  - Rating (1-5 stars)
  - Written review content
- Users cannot review their own spots
- One review per user per spot

#### Read
- Reviews displayed on spot detail pages
- Shows:
  - Reviewer name and profile picture
  - Rating
  - Review content
  - Date posted
- Average rating calculated and displayed

#### Delete
- Users can delete their own reviews
- Confirmation required before deletion
- Average rating recalculated after deletion

## User Authentication
- Sign Up
  - New user registration with email
  - Form validation
  - Unique email requirement
- Login
  - Email/password authentication
  - Error handling for invalid credentials
- Demo User
  - One-click demo user login
  - Pre-populated account for testing
- Logout
  - Secure session termination
  - Redirect to home page

## Future Features

### Bookings
- Create reservations for spots
- Manage booking calendar
- View booking history
- Cancel bookings

### Search & Filtering
- Search by location
- Filter by:
  - Price range
  - Dates available
  - Number of guests
  - Amenities

### Google Maps Integration
- Map view of spots
- Location-based search
- Interactive markers

### User Profiles
- Profile customization
- Host/guest reviews
- Booking history
- Favorite spots

### Image Management
- Multiple images per spot
- Image gallery
- AWS S3 integration for storage

### Messaging
- Direct messaging between users
- Booking inquiries
- Host-guest communication 