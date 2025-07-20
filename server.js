const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app build
app.use(express.static(path.join(__dirname, 'dist')));

// Global maintenance configuration
let globalMaintenanceConfig = {
  isGloballyActive: false,
  message: "We're currently updating our portfolio to serve you better!",
  estimatedTime: "We'll be back online shortly",
  lastUpdated: new Date().toISOString()
};

// API Routes
// Get maintenance status
app.get('/api/maintenance', (req, res) => {
  res.json(globalMaintenanceConfig);
});

// Update maintenance status (Admin only)
app.post('/api/maintenance', (req, res) => {
  const { isGloballyActive, message, estimatedTime } = req.body;
  
  globalMaintenanceConfig = {
    isGloballyActive: isGloballyActive !== undefined ? isGloballyActive : globalMaintenanceConfig.isGloballyActive,
    message: message || globalMaintenanceConfig.message,
    estimatedTime: estimatedTime || globalMaintenanceConfig.estimatedTime,
    lastUpdated: new Date().toISOString()
  };
  
  console.log('Maintenance mode updated:', globalMaintenanceConfig);
  res.json({ success: true, config: globalMaintenanceConfig });
});

// Content management endpoints
app.get('/api/content/:section', (req, res) => {
  // This would typically read from a database
  // For now, return default content
  res.json({ message: 'Content endpoint - integrate with your database' });
});

app.post('/api/content/:section', (req, res) => {
  // This would typically save to a database
  // For now, just acknowledge the request
  res.json({ success: true, message: 'Content updated successfully' });
});

// Catch all handler: send back React's index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Visit: http://localhost:${PORT}`);
  console.log(`🔧 Maintenance mode: ${globalMaintenanceConfig.isGloballyActive ? 'ACTIVE' : 'INACTIVE'}`);
});
