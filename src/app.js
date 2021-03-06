const Koa = require('koa');
const app = new Koa();

// cors
const cors = require('@koa/cors');
app.use(cors({
  credentials: true
}));

// middlewares
app.use(require('./middlewares/filter.js'));
app.use(require('./middlewares/response.js'));

// database
require('./models/db.js');

// session
const session = require('koa-session');
app.keys = ['helloworld_v3ex'];
app.use(session({}, app));

// passport
require('./auth.js');
const passport = require('koa-passport');
app.use(passport.initialize());
app.use(passport.session());

// body parser
const bodyParser = require('koa-bodyparser')();
app.use(bodyParser);

// router
const router = require('./routes');
app.use(router.routes());

// http listener
app.listen(3000);
