import express from 'express';
import bodyParser from 'body-parser';
import parties from './routes/parties';
import offices from './routes/offices';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/parties', parties);
app.use('/api/v1/offices', offices);
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});
app.use((err, req, res, next) => {
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
