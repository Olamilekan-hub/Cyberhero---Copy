const envValidator = require("./envValidator");
const ALLOWED_ORIGINS = [
  'https://prod-cyberheroes.netlify.app',
  'https://missiongaia.com',
  ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : [])
];

const getCorsHeaders = (origin) => {
  const isAllowedOrigin = ALLOWED_ORIGINS.includes(origin);
  
  return {
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age': '86400',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  };
};

const handleCors = (event) => {
  const origin = event.headers.origin || event.headers.Origin;
  return getCorsHeaders(origin);
};

const createSecureResponse = (statusCode, body, additionalHeaders = {}) => {
  const origin = process.env.HTTP_ORIGIN || '';
  const corsHeaders = getCorsHeaders(origin);
  
  let responseBody = body;
  if (statusCode >= 400 && statusCode < 600 && envValidator.isProduction()) {
    if (typeof body === 'object' && body.message) {
      responseBody = {
        ...body,
        message: envValidator.getSanitizedError(new Error(body.message), '').replace(/^: /, '')
      };
    } else if (typeof body === 'string') {
      responseBody = envValidator.getSanitizedError(new Error(body), '').replace(/^: /, '');
    }
  }
  
  return {
    statusCode,
    headers: {
      ...corsHeaders,
      ...additionalHeaders
    },
    body: typeof responseBody === 'string' ? responseBody : JSON.stringify(responseBody)
  };
};

module.exports = { 
  getCorsHeaders, 
  handleCors, 
  createSecureResponse,
  ALLOWED_ORIGINS 
};
