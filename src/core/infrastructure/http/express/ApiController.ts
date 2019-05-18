import { Request, Response } from 'express';
import container from '../../DependencyInjection';
import FindEndpointsForUser from '../../../usecase/FindEndpointsForUser';
import Endpoint from '../../../domain/Endpoint/Endpoint';

const findEndpointsForUser = container.get('core.usecase.FindEndpointsForUser', FindEndpointsForUser);

export default class ApiController {
    
  public async getUserEndpoints(req: Request, res: Response, next) {
    try {
      const username = req.params.username;
      const endpoints = await findEndpointsForUser.execute(username);
      if (!endpoints) return res.status(404).send();

      const response = {
        status: 'HEALTH',
        endpoints: this.map(endpoints)
      }
      res.status(200).json(response);
    }
    catch (error) {
      next(error);
    }
  }

  private map(endpoints: Endpoint[]) {
    return endpoints.map(endpoint => ({
      name: endpoint.getName(),
      uptime: endpoint.getAvailability(),
      statuses: endpoint.getDailyStatuses()
    }))
  }

}
