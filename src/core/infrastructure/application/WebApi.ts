import Application from "./Application";
import * as express from 'express';
import * as cors from 'cors';
import container from '../DependencyInjection';
import ApiController from "../http/express/ApiController";

export default class WebApi implements Application {
  
  run() {
    const app = express();
    app.use(cors());
    const apiController = new ApiController();
    
    app.get('/:username/endpoints', apiController.getUserEndpoints.bind(apiController));
    
    app.listen(3000)
  }

}
