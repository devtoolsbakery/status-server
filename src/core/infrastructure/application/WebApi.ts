import Application from "./Application";
import * as express from 'express';
import container from '../DependencyInjection';
import ApiController from "../http/express/ApiController";

export default class WebApi implements Application {
  
  run() {
    const app = express();
    const apiController = new ApiController();
    
    app.get('/:username/endpoints', apiController.getUserEndpoints);
    
    app.listen(3000)
  }

}
