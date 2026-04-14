# Park and Ride

A smart parking and last-mile travel system that makes city commuting smoother.

Book parking in advance, scan a QR to enter and exit, and quickly get a ride to your final destination.

Documents: https://drive.google.com/drive/folders/11E-megYMjrXW8EcYnYZedcMpRDNuKC6m?usp=drive_link

## Stack
- MongoDB
- Express
- React
- Node.js

## Features
- Browse parking locations
- Filter by availability, price, and transit access
- Add new parking locations through the API
- Reserve a spot through the API
- QR-based entry and exit flow
- Last-mile ride booking support
- Smart pricing based on demand

## Project Structure
- `client`: React app built with Vite
- `server`: Express API connected to MongoDB with Mongoose

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `server/.env` file:
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/park_and_ride
   PORT=5000
   ```
3. Start both apps in development:
   ```bash
   npm run dev
   ```
4. Build the frontend for production:
   ```bash
   npm run build
   ```
5. Start the API server:
   ```bash
   npm start
   ```

## API
- `GET /api/locations`
- `POST /api/locations`
- `POST /api/locations/:id/reserve`
- `GET /api/health`

## Team
- Devansh Bansal (Leader)
- Nitesh
- Aasu Jaiswal
- Deepak
- Gungun Gautam
