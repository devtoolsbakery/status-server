import * as should from 'should';
import * as httpMocks from 'node-mocks-http';
import ApiController from '../../../../../src/core/infrastructure/http/express/ApiController';

xdescribe('HTTP Express Api Controller v1', () => {
  
  class Response {
    private statusCode: number;
    private headers: {};
    private body: {};

    constructor(statusCode: number, headers: {}, body: {}) {
      this.statusCode = statusCode;
      this.headers = headers;
      this.body = body;
    }

    statusCodeShouldBe(expected: number) {
      return should(this.statusCode).be.eql(expected);
    }

    getHeaders(): {} {
      return this.headers;
    }

    bodyShouldBe(expected: {}): {} {
      return should(this.body).be.eql(expected);
    }
  }

  function createRequest(handler: Function) {
    return (method: string, path: string, params: {}) : Response => {
      const request  = httpMocks.createRequest({
        method: method as httpMocks.RequestMethod,
        url: path,
        params
      });

      const response = httpMocks.createResponse();

      handler(request, response);

      const jsonBody = response._isJSON()? JSON.parse(response._getData()) : '';
      
      return new Response(response._getStatusCode(), {}, jsonBody);
    }
  }

  const apiController = new ApiController();
  const request = createRequest(apiController.getUserEndpoints);

  it('Return the list of endpoints for a user', async () => {
    const username = 'ana';
    const path = `/v1/${username}/endpoints`;
    const method = 'GET';
    const params = {
      username
    };
    
    const response = await request(method, path, params);

    response.statusCodeShouldBe(200);
    response.bodyShouldBe({
      status: 'HEALTH',
      from: '2019-04-29T22:00:00.000Z',
      to: '2019-04-30T22:09:53.545Z',
      resolution: 'hour',
      endpoints: [
        {
          name: 'Ana website',
          uptime: '99.99',
          statuses: [
            {
              date: '2019-04-30T22:09:53.545Z',
              status: 'OK',
              timeInMs: 150
            }
          ]
        }
      ]
    })
  })

  it('Return 404 when the username does not exist', async () => {
    const username = 'bob';
    const path = `/v1/${username}/endpoints`;
    const method = 'GET';
    const params = {
      username
    };
    
    const response = await request(method, path, params);

    response.statusCodeShouldBe(404);

  })
})
