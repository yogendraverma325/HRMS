import swaggerAutogen from 'swagger-autogen';
import routes from './src/routes/index';
const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: 'localhost:8080'
};

const outputFile = './swagger-output.json';

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);