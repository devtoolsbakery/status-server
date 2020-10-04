import { default as BaseApplication } from "../Application";
import * as express from 'express';
import * as cors from 'cors';
import { connect } from 'mongoose';
import container from '../../di';
import ApiController from "../../http/express/ApiController";
import Configuration from "../../configuration/Configuration";

export default class Application implements BaseApplication {

  run() {
    const config: Configuration = container.get("app.configuration");
    const port = config.api.port;
    const app = express();
    const dbConnectionString = config.healthChecker.dbConnectionString;
    connect(dbConnectionString, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: false });

    app.use(cors());
    const apiController = new ApiController();

    app.get('/:username/endpoints', apiController.getUserEndpoints.bind(apiController));
    console.log(`Listening ${port}`)
    app.listen(port);
  }

}
