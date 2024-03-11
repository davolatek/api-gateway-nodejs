const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors'); // Import the cors middleware
const verifyToken = require('./verifyToken'); // Import token validation middleware

const app = express();
const PORT = 3001;

// Use the cors middleware
app.use(cors());

// Define API Gateway middleware for routing to microservices

// Define a function to create a proxy middleware with token verification
function createGatewayMiddleware(target, requiresToken = true) {
    const middlewares = [createProxyMiddleware({ target, changeOrigin: true })];
    if (requiresToken) {
        middlewares.unshift(verifyToken);
    }
    return middlewares;
}

// Apply API Gateway middleware to specific routes
app.use('/api/v1/accounts/update-account', createGatewayMiddleware('http://localhost:7900', false)); // Register user endpoint does not require token
app.use('/api/v1/accounts/change-password', createGatewayMiddleware('http://localhost:7900', false)); // Register user endpoint does not require token
app.use('/api/v1/accounts/complete-profile', createGatewayMiddleware('http://localhost:7900', false)); // Register user endpoint does not require token
app.use('/api/v1/accounts/*', createGatewayMiddleware('http://localhost:7900', false));

app.use('/api/v1/auth/*', createGatewayMiddleware('http://localhost:7901', false));

app.use('/api/v1/activities/*', createGatewayMiddleware('http://localhost:7902', false));

app.use('/api/v1/properties/*', createGatewayMiddleware('http://localhost:7904', false));

app.use('/api/v1/transactions/*', createGatewayMiddleware('http://localhost:7905', false));

// Start the server
app.listen(PORT, () => {
    console.log(`API Gateway listening at http://localhost:${PORT}`);
});
