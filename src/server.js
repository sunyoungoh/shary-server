const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/config');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 5000;
const cors = require('cors');
const morgan = require('morgan');

const userRouter = require('./routes/user');
const reviewRouter = require('./routes/review');
const reviewbookRouter = require('./routes/reviewbook');
const bookRouter = require('./routes/book');
const foodRouter = require('./routes/food');
const movieRouter = require('./routes/movie');
const musicRouter = require('./routes/music');
const mapRouter = require('./routes/map');
const openApiRouter = require('./routes/openApi');
const kakaoRouter = require('./routes/auth');
const tvRouter = require('./routes/tv');
const searchRouter = require('./routes/search');



const app = express();
app.use(morgan('dev'));
app.use(cors());

// get our request parameters
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Use the passport package in our application
app.use(passport.initialize());
const passportMiddleware = require('./middleware/passport');
passport.use(passportMiddleware);

// Demo Route (GET http://localhost:5000)
app.get('/', function (req, res) {
  return res.send('Hello! The API is at http://localhost:' + port + '/api');
});


app.use('/api/review/book', bookRouter);
app.use('/api/review/food', foodRouter);
app.use('/api/review/movie', movieRouter);
app.use('/api/review/music', musicRouter);
app.use('/api/review/tv', tvRouter);
app.use('/api/review', reviewRouter);
app.use('/api/reviewbook', reviewbookRouter);
app.use('/api/map', mapRouter);
app.use('/api/search/review', searchRouter);
app.use('/api/search', openApiRouter);
app.use('/api/auth', kakaoRouter);
app.use('/api', userRouter);

mongoose.connect(config.db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully!');
});

connection.on('error', (err) => {
  console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
  process.exit();
});

// Start the server
app.listen(port);
console.log('There will be dragons: http://localhost:' + port);