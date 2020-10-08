const express        = require('express');
const app            = express();
const bodyParser     = require('body-parser');
const mongoose       = require('mongoose');
const flash          = require('connect-flash');
const LocalStrategy  = require('passport-local');
const methodOverride = require('method-override');
const passport       = require('passport');
const Campground     = require('./models/campground');
const Comment        = require('./models/comment');
const User           = require('./models/user');
const seedDB         = require('./seeds');


//requiring routes
const commentRoutes     = require('./routes/comments'),
      campgroundRoutes  = require('./routes/campgrounds'),
      indexRoutes       = require('./routes/index');


// mongoose.connect('mongodb://localhost:27017/yelp_camp_final', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('Connected to DB!'))
// .catch(error => console.log(error.message));
mongoose.connect('mongodb+srv://webdevcamp:lupin@cluster0.agdoz.mongodb.net/yelpcamp666?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to DB!'))
.catch(error => console.log(error.message));


app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());
// seedDB(); //seed the database

///////////////////////////
// PASSPORT CONFIGURATION//
///////////////////////////
app.use(require('express-session')({
    secret: 'Sage please go to sleep!',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use('/',indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);


// start server
app.listen(process.env.PORT || 5000, () => {
    console.log('Yelpcamp Sever has Started');
});