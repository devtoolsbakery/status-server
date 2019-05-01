import { Request, Response } from 'express';
import fakeResponses from './fakeResponses';

export default class ApiController {
    
  public getUserEndpoints(req: Request, res: Response, next) {
    try {
      const username = req.params.username;
      const response = fakeResponses[username];

      if (!response) return res.status(404).send();
      
      res.status(200).json(response);
    }
    catch (error) {
      next(error);
    }
  }

}
