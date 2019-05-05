import { Request, Response } from 'express';
import container from '../../DependencyInjection';
import FindEndpointsForUser from '../../../usecase/FindEndpointsForUser';

const findEndpointsForUser = container.get('core.usecase.FindEndpointsForUser', FindEndpointsForUser);

export default class ApiController {
    
  public async getUserEndpoints(req: Request, res: Response, next) {
    try {
      const username = req.params.username;
      const response = await findEndpointsForUser.execute(username);

      if (!response) return res.status(404).send();
      
      res.status(200).json(response);
    }
    catch (error) {
      next(error);
    }
  }

}
