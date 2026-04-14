import { Router } from 'express';

export function createLocationRoutes(store) {
  const router = Router();

  router.get('/', async (req, res, next) => {
    try {
      const locations = await store.list();
      res.json({ data: locations });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const { name, city, pricePerDay, capacity, availableSpots, transitAccess, description } = req.body;

      if (!name || !city || pricePerDay === undefined || !capacity || !description) {
        return res.status(400).json({ message: 'name, city, pricePerDay, capacity, and description are required.' });
      }

      const location = await store.create({
        name: String(name).trim(),
        city: String(city).trim(),
        pricePerDay: Number(pricePerDay),
        capacity: Number(capacity),
        availableSpots: availableSpots === undefined ? Number(capacity) : Number(availableSpots),
        transitAccess: Boolean(transitAccess),
        description: String(description).trim(),
      });

      res.status(201).json({ data: location });
    } catch (error) {
      next(error);
    }
  });

  router.post('/:id/reserve', async (req, res, next) => {
    try {
      const result = await store.reserve(req.params.id);

      if (!result) {
        return res.status(404).json({ message: 'Location not found.' });
      }

      if (result.error) {
        return res.status(409).json({ message: result.error });
      }

      res.json({ data: result });
    } catch (error) {
      next(error);
    }
  });

  return router;
}
