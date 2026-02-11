import mongoose from 'mongoose';

// Waitlist Schema
const waitlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  timestamp: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  jobTitle: {
    type: String,
    trim: true,
    default: ''
  },
  company: {
    type: String,
    trim: true,
    default: ''
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['new', 'read', 'responded'],
    default: 'new'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Webinar Schema
const webinarSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  timestamp: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Create models
export const Waitlist = mongoose.model('Waitlist', waitlistSchema);
export const Contact = mongoose.model('Contact', contactSchema);
export const Webinar = mongoose.model('Webinar', webinarSchema);
