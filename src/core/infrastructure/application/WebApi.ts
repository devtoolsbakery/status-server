import Application from "./Application";
import * as express from 'express';
import * as cors from 'cors';
import container from '../DependencyInjection';
import ApiController from "../http/express/ApiController";
import Configuration from "../configuration/Configuration";

export default class WebApi implements Application {


  run() {
    const config: Configuration = container.get("app.configuration");
    const port = config.api.port;
    const app = express();
    app.use(cors());
    const apiController = new ApiController();
    
    app.get('/:username/endpoints', apiController.getUserEndpoints.bind(apiController));
    console.log(`Listening ${port}`)
    app.listen(port);
  }

}
