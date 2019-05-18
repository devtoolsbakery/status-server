import { Request, Response } from 'express';
import container from '../../DependencyInjection';
import FindEndpointsForUser from '../../../usecase/FindEndpointsForUser';
import Endpoint, {  } from '../../../domain/Endpoint/Endpoint';

const findEndpointsForUser = container.get('core.usecase.FindEndpointsForUser', FindEndpointsForUser);

export default class ApiController {
    
  public async getUserEndpoints(req: Request, res: Response, next) {
    try {
      const username = req.params.username;
      const endpoints = await findEndpointsForUser.execute(username);
      if (!endpoints) return res.status(404).send();

      const response = {
        status: 'HEALTH',
        endpoints: this.mapEndpoints(endpoints)
      }
      res.status(200).json(response);
    }
    catch (error) {
      next(error);
    }
  }

  private mapEndpoints(endpoints: Endpoint[]) {
    return endpoints.map(endpoint => ({
      name: endpoint.getName().getValue(),
      uptime: endpoint.getAvailability(),
      dailyStats: this.mapDailyStats(endpoint.getDailyStatuses())
    }))
  }

  private mapDailyStats(dailyStats: any) {
    const calculateIncidentsDuration = (incidents) => {
      return incidents.reduce((total, incident) => {
        return total + incident.duration;
      }, 0)
    }


    return dailyStats.map(status => {
      const totalIncidentsDuration = calculateIncidentsDuration(status.incidents);
      return {
        date: status.date,
        responseTime: status.averageResponseTime,
        totalIncidents: status.incidents.length,
        totalDowntime: totalIncidentsDuration,
        status: this.calculateHealth(status.incidents, totalIncidentsDuration)
      }
    })
  }
  
  //TODO: move this to the domain
  calculateHealth(incidents: any[], totalIncidentsDuration: number) {
    
    if (incidents.length > 50 || totalIncidentsDuration > 4*60) {
      return 'ERROR';
    }
    else if (incidents.length > 10 || totalIncidentsDuration > 10) {
      return 'WARNING';
    }
    else return 'OK';
  }

}
