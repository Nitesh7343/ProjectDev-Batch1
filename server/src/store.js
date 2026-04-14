import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },
    pricePerDay: { type: Number, required: true, min: 0 },
    capacity: { type: Number, required: true, min: 1 },
    availableSpots: { type: Number, required: true, min: 0 },
    transitAccess: { type: Boolean, default: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const LocationModel = mongoose.models.Location || mongoose.model('Location', locationSchema);

const fallbackLocations = [
  {
    id: '1',
    name: 'Downtown Gateway',
    city: 'Seattle',
    pricePerDay: 14,
    capacity: 120,
    availableSpots: 36,
    transitAccess: true,
    description: 'Quick access to the light rail and central business district.',
  },
  {
    id: '2',
    name: 'Harbor Transit Lot',
    city: 'Portland',
    pricePerDay: 11,
    capacity: 84,
    availableSpots: 19,
    transitAccess: true,
    description: 'Connected to the express bus line with shaded parking.',
  },
  {
    id: '3',
    name: 'Suburban Connect',
    city: 'Bellevue',
    pricePerDay: 9,
    capacity: 96,
    availableSpots: 52,
    transitAccess: false,
    description: 'Low-cost commuter parking with wide vehicle bays.',
  },
];

const toLocationDto = (location) => ({
  id: location._id?.toString() || location.id,
  name: location.name,
  city: location.city,
  pricePerDay: location.pricePerDay,
  capacity: location.capacity,
  availableSpots: location.availableSpots,
  transitAccess: location.transitAccess,
  description: location.description,
});

export async function createLocationStore(mongoUri) {
  if (mongoUri) {
    await mongoose.connect(mongoUri);
    return {
      async list() {
        const locations = await LocationModel.find().sort({ createdAt: -1 }).lean();
        return locations.map((location) => toLocationDto(location));
      },
      async create(data) {
        const location = await LocationModel.create(data);
        return toLocationDto(location);
      },
      async reserve(id) {
        const location = await LocationModel.findById(id);
        if (!location) {
          return null;
        }
        if (location.availableSpots <= 0) {
          return { error: 'No available spots left for this location.' };
        }
        location.availableSpots -= 1;
        await location.save();
        return toLocationDto(location);
      },
    };
  }

  const state = fallbackLocations.map((location) => ({ ...location }));

  return {
    async list() {
      return state.map((location) => ({ ...location }));
    },
    async create(data) {
      const location = {
        id: String(Date.now()),
        availableSpots: data.availableSpots ?? data.capacity,
        ...data,
      };
      state.unshift(location);
      return { ...location };
    },
    async reserve(id) {
      const location = state.find((item) => item.id === id);
      if (!location) {
        return null;
      }
      if (location.availableSpots <= 0) {
        return { error: 'No available spots left for this location.' };
      }
      location.availableSpots -= 1;
      return { ...location };
    },
  };
}
