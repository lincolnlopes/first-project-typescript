import express from 'express';
import routes from './routes';

const app = express();

app.use(routes);

const PORT = 3001;

app.listen(PORT || 3000, () => {
  console.log('Server started on port 3001');
});
