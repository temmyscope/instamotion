export interface Request {
  headers: { [key: string]: string },
  body: { [key: string]: any }
}

export type RequestInterceptor = (req: Request) => Request

export type ResponseInterceptor = (req: Response) => Response

/**
 * make requests to backend using flexible and manipulatable construct
 * 
 * @param {RequestInterceptor[]} rqi the interceptor(s) to operate on request before it's sent
 * @param {ResponseInterceptor[]} rpi the interceptor(s) that operate on api response before it's returned
 * @param {string} endpointPrefix url for api, call is to be made to
 * 
 * @return {{
 *  get: (uri: string) => Promise
 * }}  
 */

export const requests = (
  rqi: RequestInterceptor[], rpi: ResponseInterceptor[], serviceEndpoint: string = '',
) => {

  const interceptResponse = (resp: any ) => {
    const len = rpi.length
    for (let i = 0; i < len; i++) {
      resp = rpi[i](resp);
    }
    return resp;
  }

  const interceptRequest = (req: any) => {
    const len = rqi.length
    for (let i = 0; i < len; i++) {
      req = rqi[i](req);
    }
    return req;
  }

  const handler = async(uri: string, method: string, data?: any) => {
    let req: Request = {
      body: data, headers: {
        'Accept': 'application/json', 
        'Content-Type': 'application/json'
      }, 
    }
    req = await interceptRequest(req);
    
    return await fetch(`${serviceEndpoint}${uri}`, {
      method, headers: req.headers, body: JSON.stringify(req.body) 
    }).then(async (res) => {
      res = await interceptResponse(res);
      return res.json();
    }).then(json => {
      return json;
    }).catch( err => console.log(err) );
  }

  return ({
    get: (uri: string) => handler(uri, 'GET'),
  });
}