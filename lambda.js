import app from './app.js';

let fastifyInstance;

function getFastifyInstance() {
  if (!fastifyInstance) {
    fastifyInstance = app();
  }
  return fastifyInstance;
}

export const handler = async (event) => {
  const fastify = getFastifyInstance();

  try {
    
    const urlPath = event.rawPath || event.path || '/';

    
    const payload = event.body && typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

    
    const response = await fastify.inject({
      method: event.httpMethod || 'GET', 
      url: urlPath + (event.rawQueryString ? `?${event.rawQueryString}` : ''), 
      headers: event.headers,
      query: event.queryStringParameters,
      payload,
    });

    return {
      statusCode: response.statusCode,
      headers: {
        ...response.headers,
        'Content-Type': response.headers['content-type'] || 'application/json',
      },
      body: response.body,
      isBase64Encoded: false,
    };
  } catch (error) {
    console.error('Error processing request in Lambda handler:', error);

    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
    };
  }
};
