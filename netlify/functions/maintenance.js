// Netlify Function for maintenance mode management
export const handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Global maintenance configuration (in production, this would be stored in a database)
  // For now, we'll use environment variables or a simple JSON store
  let globalMaintenanceConfig = {
    isGloballyActive: process.env.MAINTENANCE_ACTIVE === 'true' || false,
    message: process.env.MAINTENANCE_MESSAGE || "We're currently updating our portfolio to serve you better!",
    estimatedTime: process.env.MAINTENANCE_TIME || "We'll be back online shortly",
    lastUpdated: new Date().toISOString()
  };

  try {
    if (event.httpMethod === 'GET') {
      // Get maintenance status
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(globalMaintenanceConfig),
      };
    }

    if (event.httpMethod === 'POST') {
      // Update maintenance status
      const body = JSON.parse(event.body || '{}');
      const { isGloballyActive, message, estimatedTime } = body;

      // In a real application, you would save this to a database
      // For now, we'll return the updated config
      globalMaintenanceConfig = {
        isGloballyActive: isGloballyActive !== undefined ? isGloballyActive : globalMaintenanceConfig.isGloballyActive,
        message: message || globalMaintenanceConfig.message,
        estimatedTime: estimatedTime || globalMaintenanceConfig.estimatedTime,
        lastUpdated: new Date().toISOString()
      };

      console.log('Maintenance mode updated:', globalMaintenanceConfig);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ 
          success: true, 
          config: globalMaintenanceConfig,
          note: 'In production, integrate with a database for persistent storage'
        }),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };

  } catch (error) {
    console.error('Error in maintenance function:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
    };
  }
};
