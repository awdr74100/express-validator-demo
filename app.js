const app = require('express')();
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', require('./router/users'));

app.listen(port, () => console.log(`start localhost ${port}`));
