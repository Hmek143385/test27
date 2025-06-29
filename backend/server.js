require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, { cors: { origin: '*' } });

app.use(express.json());

// WebSocket: notifier les utilisateurs en temps réel
io.on('connection', socket => {
  console.log('User connected');
});

app.set('io', io); // Pour accéder à io dans les routes

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/interactions', require('./routes/interactionRoutes'));
app.use('/api/taches', require('./routes/tacheRoutes'));
app.use('/api/contrats', require('./routes/contratRoutes'));
app.use('/api/produits', require('./routes/produitRoutes'));
app.use('/api/admins', require('./routes/adminRoutes'));

const PORT = process.env.PORT || 3001;

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});