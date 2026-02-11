import { Waitlist, Contact, Webinar } from './models.js';

// Waitlist operations
export const waitlistDB = {
  // Get all waitlist entries
  getAll: async () => {
    try {
      return await Waitlist.find().sort({ created_at: -1 }).lean();
    } catch (error) {
      console.error('Error fetching waitlist:', error);
      return [];
    }
  },

  // Get single entry by email
  getByEmail: async (email) => {
    try {
      return await Waitlist.findOne({ email }).lean();
    } catch (error) {
      console.error('Error fetching entry:', error);
      return null;
    }
  },

  // Add new entry
  add: async (name, email, timestamp) => {
    try {
      // Check if email already exists
      const exists = await Waitlist.findOne({ email });
      if (exists) {
        return { success: false, error: 'Email already exists in waitlist' };
      }

      const newEntry = new Waitlist({
        name,
        email,
        timestamp
      });

      await newEntry.save();
      return { success: true, id: newEntry._id };
    } catch (error) {
      console.error('Error adding entry:', error);
      return { success: false, error: 'Failed to save data' };
    }
  },

  // Delete entry
  delete: async (email) => {
    try {
      const result = await Waitlist.deleteOne({ email });
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error deleting entry:', error);
      return false;
    }
  },

  // Get stats
  getStats: async () => {
    try {
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      const total = await Waitlist.countDocuments();
      const thisWeek = await Waitlist.countDocuments({ created_at: { $gt: weekAgo } });
      const today = await Waitlist.countDocuments({ created_at: { $gt: todayStart } });

      return { total, thisWeek, today };
    } catch (error) {
      console.error('Error fetching stats:', error);
      return { total: 0, thisWeek: 0, today: 0 };
    }
  }
};

// Contact form operations
export const contactDB = {
  getAll: async () => {
    try {
      return await Contact.find().sort({ created_at: -1 }).lean();
    } catch (error) {
      console.error('Error fetching contacts:', error);
      return [];
    }
  },

  add: async (name, jobTitle, company, email, phone, message, timestamp) => {
    try {
      const newEntry = new Contact({
        name,
        jobTitle: jobTitle || '',
        company: company || '',
        email,
        phone: phone || '',
        message,
        timestamp,
        status: 'new'
      });

      await newEntry.save();
      return { success: true, id: newEntry._id };
    } catch (error) {
      console.error('Error adding contact:', error);
      return { success: false, error: 'Failed to save data' };
    }
  },

  delete: async (id) => {
    try {
      const result = await Contact.deleteOne({ _id: id });
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error deleting contact:', error);
      return false;
    }
  }
};

// Webinar registration operations
export const webinarDB = {
  getAll: async () => {
    try {
      return await Webinar.find().sort({ created_at: -1 }).lean();
    } catch (error) {
      console.error('Error fetching webinar registrations:', error);
      return [];
    }
  },

  add: async (email, timestamp) => {
    try {
      // Check if email already exists
      const exists = await Webinar.findOne({ email });
      if (exists) {
        return { success: false, error: 'Email already registered for webinar updates' };
      }

      const newEntry = new Webinar({
        email,
        timestamp
      });

      await newEntry.save();
      return { success: true, id: newEntry._id };
    } catch (error) {
      console.error('Error adding webinar registration:', error);
      return { success: false, error: 'Failed to save data' };
    }
  },

  delete: async (email) => {
    try {
      const result = await Webinar.deleteOne({ email });
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error deleting webinar registration:', error);
      return false;
    }
  }
};

console.log('✅ Database initialized successfully');

export default waitlistDB;
