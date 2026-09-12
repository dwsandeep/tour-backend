# Tour & Travels API Endpoints

## Base URL
```
http://localhost:YOUR_PORT/api
```

## Services
- `GET /api/services` - Get all services
- `GET /api/services/active` - Get active services only
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create new service
- `PATCH /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

## Cars
- `GET /api/cars` - Get all cars
- `GET /api/cars/active` - Get active cars only
- `GET /api/cars/:id` - Get car by ID
- `POST /api/cars` - Create new car
- `PATCH /api/cars/:id` - Update car
- `DELETE /api/cars/:id` - Delete car

## Packages
- `GET /api/packages` - Get all packages
- `GET /api/packages/active` - Get active packages only
- `GET /api/packages/featured` - Get featured packages only
- `GET /api/packages/:id` - Get package by ID
- `POST /api/packages` - Create new package
- `PATCH /api/packages/:id` - Update package
- `DELETE /api/packages/:id` - Delete package

## Bookings
- `GET /api/bookings` - Get all bookings (supports query params: ?status=PENDING&bookingType=PACKAGE)
- `GET /api/bookings/:id` - Get booking by ID
- `POST /api/bookings` - Create new booking
- `PATCH /api/bookings/:id` - Update booking status
- `PATCH /api/bookings/:id/verify-otp` - Verify OTP for booking
- `DELETE /api/bookings/:id` - Delete booking
