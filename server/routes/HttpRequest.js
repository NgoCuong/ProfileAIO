/* 
   This class is used to create API calls
   The class uses promise-request npm module
   Wrapped to handle error codes 
*/

module.exports = class HttpRequest {

    constructor(accessToken = '') {
        this.request = require('request-promise');
        this.accessToken = accessToken;
    }

    async httpRequest(uri, requestType, body = {}) {
        var options = {
            auth: { 'bearer': this.accessToken },
            method: requestType,
            body: body,
            json: true,
        };
        var result = await this.request(uri, options)
            .catch(function (reason) {
                switch (reason.statusCode) {
                    case 200:
                        console.log('200 OK	The request was successful');
                        break;
                    case 204:
                        console.log('204 No Content	The server successfully fulfilled the request and there is no additional content to send.');
                        break;
                    case 400:
                        console.log('400 Bad Request You submitted an invalid request (missing parameters, etc.)');
                        break;
                    case 401:
                        console.log('401 Unauthorized You failed to authenticate for this resource.');
                        break;
                    case 403:
                        console.log('403 Forbidden You are authenticated, but dont have permission to do this.');
                        break;
                    case 404:
                        console.log('404 Not Found	The resource youre requesting does not exist.');
                        break;
                    case 429:
                        console.log('429 Too Many Requests	Youve hit a rate limit.');
                        break;
                    case 500:
                        console.log('Internal Server Error	Please open a Support Ticket.');
                        break;
                    default:
                        console.log('Unknown Error');
                        console.log(reason);
                }
                throw reason;
            }
            );
        return result;
    }
}