// Netlify Function for Maintenance Mode
// Handles maintenance mode status and configuration

let maintenanceConfig = {
  enabled: false,
  message: "We're currently performing scheduled maintenance. Please check back soon!",
  estimatedCompletion: null,
  allowedPaths: ['/admin', '/api'],
  adminPassword: 'admin123', // In production, use environment variables
  lastUpdated: new Date().toISOString()
};

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const { httpMethod, body, headers: requestHeaders } = event;

    switch (httpMethod) {
      case 'GET':
        // Return maintenance status
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            data: {
              enabled: maintenanceConfig.enabled,
              message: maintenanceConfig.message,
              estimatedCompletion: maintenanceConfig.estimatedCompletion,
              lastUpdated: maintenanceConfig.lastUpdated
            }
          })
        };

      case 'POST':
      case 'PUT':
        // Update maintenance configuration (admin only)
        const updateData = JSON.parse(body);
        const authorization = requestHeaders.authorization;
        
        // Simple authentication check (in production, use proper JWT/session management)
        if (!authorization || !authorization.includes(maintenanceConfig.adminPassword)) {
          return {
            statusCode: 401,
            headers,
            body: JSON.stringify({
              success: false,
              error: 'Unauthorized'
            })
          };
        }

        // Update maintenance configuration
        if (updateData.hasOwnProperty('enabled')) {
          maintenanceConfig.enabled = updateData.enabled;
        }
        if (updateData.message) {
          maintenanceConfig.message = updateData.message;
        }
        if (updateData.estimatedCompletion) {
          maintenanceConfig.estimatedCompletion = updateData.estimatedCompletion;
        }
        if (updateData.allowedPaths) {
          maintenanceConfig.allowedPaths = updateData.allowedPaths;
        }

        maintenanceConfig.lastUpdated = new Date().toISOString();

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            success: true,
            data: {
              enabled: maintenanceConfig.enabled,
              message: maintenanceConfig.message,
              estimatedCompletion: maintenanceConfig.estimatedCompletion,
              lastUpdated: maintenanceConfig.lastUpdated
            },
            message: 'Maintenance configuration updated successfully'
          })
        };

      default:
        return {
          statusCode: 405,
          headers,
          body: JSON.stringify({
            success: false,
            error: 'Method not allowed'
          })
        };
    }

  } catch (error) {
    console.error('Maintenance function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Internal server error'
      })
    };
  }
};
