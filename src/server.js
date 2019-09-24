var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var mongoose = require('mongoose');
var config = require('./config/config');
var port = process.env.PORT || 5000;
var cors = require('cors');
var morgan = require('morgan');

var userRouter = require('./routes/user');
var reviewRouter = require('./routes/review');
var reviewbookRouter = require('./routes/reviewbook');
var bookRouter = require('./routes/book');
var foodRouter = require('./routes/food');
var movieRouter = require('./routes/movie');
var musicRouter = require('./routes/music');
var mapRouter = require('./routes/map');
var openApiRouter = require('./routes/openApi');
var kakaoRouter = require('./routes/auth');
var tvRouter = require('./routes/tv');
var searchRouter = require('./routes/search');



var app = express();
app.use(morgan('dev'));
app.use(cors());

// get our request parameters
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Use the passport package in our application
app.use(passport.initialize());
var passportMiddleware = require('./middleware/passport');
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