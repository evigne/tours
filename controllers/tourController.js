const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

exports.checkID = (req, res, next, val) => {
  if (parseInt(req.params.id, 10) > tours.length) {
    return res.status(404).json({ status: 'fail', message: 'Invalid Id' });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  const { name, price } = req.body;
  if (!name || !price) {
    return res.status(400).json({
      status: 'fail',
      message: 'One or More required fiel is missing',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'Success',
    requestedAT: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

exports.getTour = (req, res) => {
  const id = parseInt(req.params.id, 10);
  //   if (id > tours.length) {
  //     return res.status(404).json({ status: 'fail', message: 'Invalid Id' });
  //   }
  const tour = tours.find((el) => el.id === id);
  //   const tour = tours.filter((tour) => tour.id == id);
  // if (!tour) {
  //   return res.status(404).json({ status: 'fail', message: 'Invalid Id' });
  // }
  res.status(200).json({
    status: 'Success',

    data: { tour },
  });
};
exports.createTour = (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;

  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),

    () => {
      res.status(201).json({ status: 'success', data: { tour: newTour } });
    },
  );
};

exports.updateTour = (req, res) => {
  // if (parseInt(req.params.id) > tours.length) {
  //   return res.status(404).json({ status: 'fail', message: 'Invalid Id' });
  // }
  res
    .status(200)
    .json({ status: 'success', data: { tour: '<Updated tour here...' } });
};

exports.deleteTour = (req, res) => {
  // if (parseInt(req.params.id) > tours.length) {
  //   return res.status(404).json({ status: 'fail', message: 'Invalid Id' });
  // }
  res.status(204).json({ status: 'success', data: null });
};

// module.exports = { getAllTours, getTour, createTour, updateTour, deleteTour };
