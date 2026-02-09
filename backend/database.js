import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_FILE = join(__dirname, 'data', 'waitlist.json');
const DATA_DIR = join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize DB file if it doesn't exist
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ waitlist: [] }, null, 2));
  console.log('✅ Database file created');
}

// Read data from file
const readData = () => {
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return { waitlist: [] };
  }
};

// Write data to file
const writeData = (data) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing to database:', error);
    return false;
  }
};

// Waitlist operations
export const waitlistDB = {
  // Get all waitlist entries
  getAll: () => {
    const data = readData();
    return data.waitlist.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },

  // Get single entry by email
  getByEmail: (email) => {
    const data = readData();
    return data.waitlist.find(entry => entry.email === email);
  },

  // Add new entry
  add: (name, email, timestamp) => {
    const data = readData();
    
    // Check if email already exists
    const exists = data.waitlist.some(entry => entry.email === email);
    if (exists) {
      return { success: false, error: 'Email already exists in waitlist' };
    }

    const newEntry = {
      id: Date.now(),
      name,
      email,
      timestamp,
      created_at: new Date().toISOString()
    };

    data.waitlist.push(newEntry);
    
    if (writeData(data)) {
      return { success: true, id: newEntry.id };
    } else {
      return { success: false, error: 'Failed to save data' };
    }
  },

  // Delete entry
  delete: (email) => {
    const data = readData();
    const initialLength = data.waitlist.length;
    data.waitlist = data.waitlist.filter(entry => entry.email !== email);
    
    if (data.waitlist.length < initialLength) {
      writeData(data);
      return true;
    }
    return false;
  },

  // Get stats
  getStats: () => {
    const data = readData();
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const total = data.waitlist.length;
    const thisWeek = data.waitlist.filter(e => new Date(e.created_at) > weekAgo).length;
    const today = data.waitlist.filter(e => new Date(e.created_at) > todayStart).length;

    return { total, thisWeek, today };
  }
};

// Contact form operations
export const contactDB = {
  getAll: () => {
    const data = readData();
    return (data.contacts || []).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },

  add: (name, jobTitle, company, email, phone, message, timestamp) => {
    const data = readData();
    
    if (!data.contacts) {
      data.contacts = [];
    }

    const newEntry = {
      id: Date.now(),
      name,
      jobTitle: jobTitle || '',
      company: company || '',
      email,
      phone: phone || '',
      message,
      timestamp,
      created_at: new Date().toISOString(),
      status: 'new'
    };

    data.contacts.push(newEntry);
    
    if (writeData(data)) {
      return { success: true, id: newEntry.id };
    } else {
      return { success: false, error: 'Failed to save data' };
    }
  },

  delete: (id) => {
    const data = readData();
    if (!data.contacts) return false;
    
    const initialLength = data.contacts.length;
    data.contacts = data.contacts.filter(entry => entry.id !== id);
    
    if (data.contacts.length < initialLength) {
      writeData(data);
      return true;
    }
    return false;
  }
};

// Webinar registration operations
export const webinarDB = {
  getAll: () => {
    const data = readData();
    return (data.webinar || []).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  },

  add: (email, timestamp) => {
    const data = readData();
    
    if (!data.webinar) {
      data.webinar = [];
    }

    // Check if email already exists
    const exists = data.webinar.some(entry => entry.email === email);
    if (exists) {
      return { success: false, error: 'Email already registered for webinar updates' };
    }

    const newEntry = {
      id: Date.now(),
      email,
      timestamp,
      created_at: new Date().toISOString()
    };

    data.webinar.push(newEntry);
    
    if (writeData(data)) {
      return { success: true, id: newEntry.id };
    } else {
      return { success: false, error: 'Failed to save data' };
    }
  },

  delete: (email) => {
    const data = readData();
    if (!data.webinar) return false;
    
    const initialLength = data.webinar.length;
    data.webinar = data.webinar.filter(entry => entry.email !== email);
    
    if (data.webinar.length < initialLength) {
      writeData(data);
      return true;
    }
    return false;
  }
};

console.log('✅ Database initialized successfully');

export default waitlistDB;
