import express from 'express';
import bodyParser from 'body-parser';
import parties from './routes/parties';
import offices from './routes/offices';
import users from './routes/users';
import votes from './routes/votes';
import defaults from './routes/defaults';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    return res.status(200).json({});
  }
  next();
});

app.use('/api/v1/parties', parties);
app.use('/api/v1/offices', offices);
app.use('/api/v1/auth', users);
app.use('/api/v1/votes', votes);
app.use('/api/v1/', defaults);
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    error: {
      status: err.status,
      message: err.message,
    },
  });
});

app.listen(PORT, () => {
  console.log('Sever has started');
});


export default app;
