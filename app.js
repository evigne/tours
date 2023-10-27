const fs = require('fs');
const express = require('express');
const morgarn = require('morgan');
const morgan = require('morgan');

const app = express();
// 1) Middlewares
app.use(morgan('dev')); // Logging Middleware
app.use(express.json()); //Middleware to get the request body req.body in post methods

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2) Route Handlers

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'Success',
    requestedAT: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

const getTour = (req, res) => {
  const id = parseInt(req.params.id);
  //   if (id > tours.length) {
  //     return res.status(404).json({ status: 'fail', message: 'Invalid Id' });
  //   }
  const tour = tours.find((el) => el.id === id);
  //   const tour = tours.filter((tour) => tour.id == id);
  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'Invalid Id' });
  }
  res.status(200).json({
    status: 'Success',

    data: { tour },
  });
};
const createTour = (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: 'success', data: { tour: newTour } });
    }
  );
};

const updateTour = (req, res) => {
  if (parseInt(req.params.id) > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid Id' });
  }
  res
    .status(200)
    .json({ status: 'success', data: { tour: '<Updated tour here...' } });
};

const deleteTour = (req, res) => {
  if (parseInt(req.params.id) > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid Id' });
  }
  res.status(204).json({ status: 'success', data: null });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not defined',
  });
};
const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not defined',
  });
};
const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not defined',
  });
};
const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not defined',
  });
};
const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Route not defined',
  });
};

// 3) Routes

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);
// app.get('/api/v1/tours/:id', getTour);

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.route('/api/v1/users').get(getAllUsers).post(createUser);
app
  .route('/api/v1/users/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);
// 4) Start Server
const port = 3001;
app.listen(port, () => console.log(`App running on port ${port}.....`));
