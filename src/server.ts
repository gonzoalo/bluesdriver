import morgan from 'morgan';
import helmet from 'helmet';
import express, {Request, Response, NextFunction} from 'express';
import logger from 'jet-logger';
import cors from 'cors';

import BaseRouter from '@src/routes';

import Paths from '@src/common/constants/Paths';
import ENV from '@src/common/constants/ENV';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { RouteError } from '@src/common/util/route-errors';
import { NodeEnvs } from '@src/common/constants';

// Setup

const app = express();

// Middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Show routes called in console during development
if (ENV.NodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'))
}

// Security
if (ENV.NodeEnv === NodeEnvs.Production) {
  // eslint-disable-next-line n/no-process-env
  // if (!process.env.DISABLE_HELMET) {
  app.use(helmet());
  // }
}

// Add APIs, must be after middleware
app.use(Paths.Base, BaseRouter)

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/fullstack-ts-app', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('Failed to connect to MongoDB', err));


// Define routes
// app.get('/', (req, res) => {
//   res.send('Hello from the server!');
// });
// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });

// Send this to a routes file

// POST: Add a new user
// app.post('/api/users', async (req, res) => {
//   try {
//     const { name, email, age } = req.body;
//     const user = new User({ name, email, age });
//     await user.save();
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating user', error });
//   }
// });
// // GET: Fetch all users
// app.get('/api/users', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching users', error });
//   }
// });


// Error handler
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  if(ENV.NodeEnv !== NodeEnvs.test.valueOf()) {
    logger.err(err, true);
  }
  let status = HttpStatusCodes.BAD_REQUEST;
  if (err instanceof RouteError) {
    status = err.status;
    res.status(status).json({ error: err.message });
  }
  return next(err);
})

export default app;