import express from 'express';

require('dotenv').config();

// eslint-disable-next-line import/first
import { router as indexRouter } from './routes';

// import { celebrate, Joi, errors, Segments } from 'celebrate'

// import bodyParser from 'body-parser'

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRouter);
// app.use(errors());
// app.use((error, req, res, next) => {
//     // Bad request error
//     res.status(400)
//     res.json(error)
// })

// app.listen(process.env.PORT || 3000);

export { app };
