const express = require('express');
const tourController = require('../controllers/tourController');

const fs = require('fs');

const router = express.Router();

// app.route('/api/v1/tours').get(getAllTours).post(createTour);
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

// app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
