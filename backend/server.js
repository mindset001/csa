import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { waitlistDB, contactDB, webinarDB } from './database.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Admin authentication endpoint
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    res.json({
      success: true,
      token: 'authenticated', // In production, use JWT
      email: email
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

// Get all waitlist entries
app.get('/api/waitlist', (req, res) => {
  try {
    const entries = waitlistDB.getAll();
    res.json({
      success: true,
      data: entries
    });
  } catch (error) {
    console.error('Error fetching waitlist:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch waitlist entries'
    });
  }
});

// Get waitlist statistics
app.get('/api/waitlist/stats', (req, res) => {
  try {
    const stats = waitlistDB.getStats();
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
});

// Add new waitlist entry
app.post('/api/waitlist', (req, res) => {
  const { name, email } = req.body;

  // Validation
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: 'Name and email are required'
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please enter a valid email address'
    });
  }

  try {
    const timestamp = new Date().toISOString();
    const result = waitlistDB.add(name, email, timestamp);

    if (result.success) {
      res.status(201).json({
        success: true,
        message: 'Successfully added to waitlist',
        data: { id: result.id, name, email, timestamp }
      });
    } else {
      res.status(409).json({
        success: false,
        message: result.error
      });
    }
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add to waitlist'
    });
  }
});

// Delete waitlist entry
app.delete('/api/waitlist/:email', (req, res) => {
  const { email } = req.params;

  try {
    const deleted = waitlistDB.delete(email);

    if (deleted) {
      res.json({
        success: true,
        message: 'Entry deleted successfully'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Entry not found'
      });
    }
  } catch (error) {
    console.error('Error deleting entry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete entry'
    });
  }
});

// Contact form endpoints
app.get('/api/contact', (req, res) => {
  try {
    const entries = contactDB.getAll();
    res.json({
      success: true,
      data: entries
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact entries'
    });
  }
});

app.post('/api/contact', (req, res) => {
  const { name, jobTitle, company, email, phone, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Name, email, and message are required'
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please enter a valid email address'
    });
  }

  try {
    const timestamp = new Date().toISOString();
    const result = contactDB.add(name, jobTitle, company, email, phone, message, timestamp);

    if (result.success) {
      res.status(201).json({
        success: true,
        message: 'Contact form submitted successfully',
        data: { id: result.id, name, email, timestamp }
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to submit contact form'
      });
    }
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit contact form'
    });
  }
});

app.delete('/api/contact/:id', (req, res) => {
  const { id } = req.params;

  try {
    const deleted = contactDB.delete(parseInt(id));

    if (deleted) {
      res.json({
        success: true,
        message: 'Contact entry deleted successfully'
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Contact entry not found'
      });
    }
  } catch (error) {
    console.error('Error deleting contact entry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact entry'
    });
  }
});

// Webinar registration endpoint
app.get('/api/webinar', (req, res) => {
  try {
    const entries = webinarDB.getAll();
    res.json({
      success: true,
      data: entries
    });
  } catch (error) {
    console.error('Error fetching webinar registrations:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch webinar registrations'
    });
  }
});

app.post('/api/webinar', (req, res) => {
  const { email } = req.body;

  // Validation
  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email is required'
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Please enter a valid email address'
    });
  }

  try {
    const timestamp = new Date().toISOString();
    const result = webinarDB.add(email, timestamp);

    if (result.success) {
      res.status(201).json({
        success: true,
        message: 'Successfully registered for webinar updates',
        data: { id: result.id, email, timestamp }
      });
    } else {
      res.status(409).json({
        success: false,
        message: result.error
      });
    }
  } catch (error) {
    console.error('Error registering for webinar:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to register for webinar'
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 API Health: http://localhost:${PORT}/api/health\n`);
});
