const fs = require('fs');
const Tour = require('../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// );

// exports.checkID = (req, res, next, val) => {
//   if (parseInt(req.params.id, 10) > tours.length) {
//     return res.status(404).json({ status: 'fail', message: 'Invalid Id' });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   const { name, price } = req.body;
//   if (!name || !price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'One or More required fiel is missing',
//     });
//   }
//   next();
// };

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: 'Success',
      results: tours.length,
      data: { tours },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'Success',

      data: { tour },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }

  //OLD USING LOCAL FILE
  // const id = parseInt(req.params.id, 10);
  //   if (id > tours.length) {
  //     return res.status(404).json({ status: 'fail', message: 'Invalid Id' });
  //   }
  // const tour = tours.find((el) => el.id === id);
  //   const tour = tours.filter((tour) => tour.id == id);
  // if (!tour) {
  //   return res.status(404).json({ status: 'fail', message: 'Invalid Id' });
  // }
  // res.status(200).json({
  //   status: 'Success',

  //   data: { tour },
  // });
};
exports.createTour = async (req, res) => {
  try {
    // const newTour = new Tour({});
    // newTour.save;
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { tour: newTour },
    });
  } catch (error) {
    res.status(400).json({ status: 'Fail', message: error });
  }

  //OLD USING LOCAL FILE
  //   console.log(req.body);
  // const newId = tours[tours.length - 1].id + 1;

  // const newTour = Object.assign({ id: newId }, req.body);
  // tours.push(newTour);
  // fs.writeFile(
  //   `${__dirname}/../dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),

  //   () => {
  //     res.status(201).json({ status: 'success', data: { tour: newTour } });
  //   },
  // );
};

exports.updateTour = async (req, res) => {
  try {
    // if (parseInt(req.params.id) > tours.length) {
    //   return res.status(404).json({ status: 'fail', message: 'Invalid Id' });
    // }
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: 'success', data: { tour } });
  } catch (error) {
    res.status(400).json({ status: 'Fail', message: error });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    // if (parseInt(req.params.id) > tours.length) {
    //   return res.status(404).json({ status: 'fail', message: 'Invalid Id' });
    // }
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: 'success', data: null });
  } catch (error) {
    res.status(404).json({ status: 'Fail', message: error });
  }
};

// module.exports = { getAllTours, getTour, createTour, updateTour, deleteTour };
