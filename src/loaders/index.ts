import { Application } from 'express';
import expressLoader from './express.js';
import mongooseLoader from './mongoose.js';

const loader = (app: Application) => {
  // mongooseLoader();
  try {
    expressLoader(app);
  } catch (error) {
    console.log("err",error)
  }
 
};

export default loader;
