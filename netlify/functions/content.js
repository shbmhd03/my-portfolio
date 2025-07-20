// Netlify Function for content management
export const handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const { section } = event.queryStringParameters || {};

  try {
    if (event.httpMethod === 'GET') {
      // Get content for a specific section
      // In production, this would fetch from a database
      const defaultContent = {
        home: { message: 'Welcome to the portfolio' },
        about: { message: 'About section content' },
        projects: { message: 'Projects section content' },
        contact: { message: 'Contact section content' }
      };

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          section,
          content: defaultContent[section] || { message: 'Content not found' },
          note: 'Integrate with a database for dynamic content management'
        }),
      };
    }

    if (event.httpMethod === 'POST') {
      // Update content for a specific section
      const body = JSON.parse(event.body || '{}');
      
      // In production, save to database
      console.log(`Updating ${section} content:`, body);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          section,
          message: 'Content updated successfully',
          note: 'In production, this would save to a database'
        }),
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };

  } catch (error) {
    console.error('Error in content function:', error);
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
