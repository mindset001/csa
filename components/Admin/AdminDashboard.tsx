import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  Mail, 
  Calendar, 
  TrendingUp, 
  Download, 
  LogOut,
  Search,
  Filter,
  Trash2,
  Shield
} from 'lucide-react';
import { Logo } from '../UI/Logo';
import { MagnetButton } from '../UI/MagnetButton';

interface WaitlistEntry {
  name: string;
  email: string;
  timestamp: string;
}

interface ContactEntry {
  id: number;
  name: string;
  jobTitle: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
  status: string;
}

interface WebinarEntry {
  id: number;
  email: string;
  timestamp: string;
}

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'waitlist' | 'contacts' | 'webinar'>('waitlist');
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [filteredWaitlist, setFilteredWaitlist] = useState<WaitlistEntry[]>([]);
  const [contacts, setContacts] = useState<ContactEntry[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<ContactEntry[]>([]);
  const [webinarList, setWebinarList] = useState<WebinarEntry[]>([]);
  const [filteredWebinar, setFilteredWebinar] = useState<WebinarEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'name'>('newest');
  const [adminEmail, setAdminEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Load admin email
    const email = localStorage.getItem('csaAdminEmail') || 'Admin';
    setAdminEmail(email);

    // Fetch all data from backend
    fetchWaitlist();
    fetchContacts();
    fetchWebinar();
  }, []);

  const fetchWaitlist = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/waitlist');
      const data = await response.json();
      
      if (data.success) {
        setWaitlist(data.data);
        setFilteredWaitlist(data.data);
      }
    } catch (error) {
      console.error('Error fetching waitlist:', error);
    }
  };

  const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/contact');
      const data = await response.json();
      
      if (data.success) {
        setContacts(data.data);
        setFilteredContacts(data.data);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const fetchWebinar = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/webinar');
      const data = await response.json();
      
      if (data.success) {
        setWebinarList(data.data);
        setFilteredWebinar(data.data);
      }
    } catch (error) {
      console.error('Error fetching webinar:', error);
    }
  };

  useEffect(() => {
    // Filter and sort based on active tab
    if (activeTab === 'waitlist') {
      let filtered = waitlist.filter(entry => 
        entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.email.toLowerCase().includes(searchTerm.toLowerCase())
      );

      filtered = [...filtered].sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        } else if (sortBy === 'oldest') {
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        } else {
          return a.name.localeCompare(b.name);
        }
      });

      setFilteredWaitlist(filtered);
    } else if (activeTab === 'contacts') {
      let filtered = contacts.filter(entry => 
        entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.company.toLowerCase().includes(searchTerm.toLowerCase())
      );

      filtered = [...filtered].sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        } else if (sortBy === 'oldest') {
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        } else {
          return a.name.localeCompare(b.name);
        }
      });

      setFilteredContacts(filtered);
    } else if (activeTab === 'webinar') {
      let filtered = webinarList.filter(entry => 
        entry.email.toLowerCase().includes(searchTerm.toLowerCase())
      );

      filtered = [...filtered].sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        } else {
          return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        }
      });

      setFilteredWebinar(filtered);
    }
  }, [searchTerm, sortBy, waitlist, contacts, webinarList, activeTab]);

  const handleLogout = () => {
    localStorage.removeItem('csaAdminToken');
    localStorage.removeItem('csaAdminEmail');
    navigate('/admin/login');
  };

  const handleDownloadCSV = () => {
    const csv = [
      ['Name', 'Email', 'Date Joined'],
      ...waitlist.map(entry => [
        entry.name,
        entry.email,
        new Date(entry.timestamp).toLocaleString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `waitlist-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const handleDeleteEntry = async (email: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/waitlist/${encodeURIComponent(email)}`, {
          method: 'DELETE',
        });
        
        const data = await response.json();
        
        if (data.success) {
          fetchWaitlist();
        } else {
          alert('Failed to delete entry: ' + data.message);
        }
      } catch (error) {
        console.error('Error deleting entry:', error);
        alert('Failed to delete entry. Please try again.');
      }
    }
  };

  const handleDeleteContact = async (id: number) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/contact/${id}`, {
          method: 'DELETE',
        });
        
        const data = await response.json();
        
        if (data.success) {
          fetchContacts();
        } else {
          alert('Failed to delete contact: ' + data.message);
        }
      } catch (error) {
        console.error('Error deleting contact:', error);
        alert('Failed to delete contact. Please try again.');
      }
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const stats = [
    {
      label: 'Newsletter Subscribers',
      value: waitlist.length,
      icon: Users,
      color: 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20'
    },
    {
      label: 'Contact Messages',
      value: contacts.length,
      icon: Mail,
      color: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
    },
    {
      label: 'Webinar Registrations',
      value: webinarList.length,
      icon: Calendar,
      color: 'bg-green-500/10 text-green-400 border-green-500/20'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d2535] via-[#1a3a4f] to-[#0d2535]">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-cyan rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-20 w-96 h-96 bg-brand-light rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-white/5 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Logo className="w-10 h-10" />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-display font-bold text-white">Admin Dashboard</h1>
                  <div className="inline-flex items-center gap-1 bg-brand-cyan/10 border border-brand-cyan/20 rounded-full px-2 py-0.5">
                    <Shield className="w-3 h-3 text-brand-cyan" />
                    <span className="text-xs font-medium text-brand-cyan">Admin</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400">Welcome back, {adminEmail.split('@')[0]}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                View Website
              </button>
              <MagnetButton
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg transition-all flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </MagnetButton>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className={`bg-white/5 backdrop-blur-lg border ${stat.color} rounded-xl p-6`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-2 mb-6"
        >
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('waitlist')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'waitlist'
                  ? 'bg-brand-cyan text-brand-darkest'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Newsletter ({waitlist.length})
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'contacts'
                  ? 'bg-brand-cyan text-brand-darkest'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Contact Messages ({contacts.length})
            </button>
            <button
              onClick={() => setActiveTab('webinar')}
              className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'webinar'
                  ? 'bg-brand-cyan text-brand-darkest'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Webinar ({webinarList.length})
            </button>
          </div>
        </motion.div>

        {/* Filters and Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full pl-11 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:border-transparent transition-all"
              />
            </div>

            {/* Sort and Export */}
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full pl-10 pr-8 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-brand-cyan appearance-none cursor-pointer"
                >
                  <option value="newest" className="bg-[#1a3a4f]">Newest First</option>
                  <option value="oldest" className="bg-[#1a3a4f]">Oldest First</option>
                  <option value="name" className="bg-[#1a3a4f]">Name (A-Z)</option>
                </select>
              </div>

              <MagnetButton
                onClick={handleDownloadCSV}
                disabled={waitlist.length === 0}
                className="px-4 py-2.5 bg-brand-cyan hover:bg-brand-cyan/90 text-brand-darkest font-medium rounded-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                <span className="hidden md:inline">Export CSV</span>
              </MagnetButton>
            </div>
          </div>
        </motion.div>

        {/* Data Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden"
        >
          {activeTab === 'waitlist' && (
            filteredWaitlist.length === 0 ? (
              <div className="text-center py-12">
                <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-2">
                  {searchTerm ? 'No matching entries found' : 'No waitlist entries yet'}
                </p>
                <p className="text-gray-500 text-sm">
                  {searchTerm ? 'Try adjusting your search' : 'Entries will appear here as users sign up'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Date Joined</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredWaitlist.map((entry, idx) => (
                      <motion.tr key={entry.email} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: idx * 0.05 }} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-brand-cyan/20 border border-brand-cyan/30 flex items-center justify-center">
                              <span className="text-brand-cyan font-semibold text-sm">{entry.name.charAt(0).toUpperCase()}</span>
                            </div>
                            <span className="text-white font-medium">{entry.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a href={`mailto:${entry.email}`} className="text-gray-400 hover:text-brand-cyan transition-colors flex items-center gap-2">
                            <Mail className="w-4 h-4" />{entry.email}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-400">{formatDate(entry.timestamp)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button onClick={() => handleDeleteEntry(entry.email)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" title="Delete entry">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}

          {activeTab === 'contacts' && (
            filteredContacts.length === 0 ? (
              <div className="text-center py-12">
                <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-2">
                  {searchTerm ? 'No matching contacts found' : 'No contact messages yet'}
                </p>
                <p className="text-gray-500 text-sm">
                  {searchTerm ? 'Try adjusting your search' : 'Messages will appear here when users contact you'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Company</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Message</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredContacts.map((entry, idx) => (
                      <motion.tr key={entry.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: idx * 0.05 }} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-white font-medium">{entry.name}</div>
                          {entry.jobTitle && <div className="text-xs text-gray-400">{entry.jobTitle}</div>}
                        </td>
                        <td className="px-6 py-4 text-gray-400">{entry.company || '-'}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a href={`mailto:${entry.email}`} className="text-gray-400 hover:text-brand-cyan transition-colors flex items-center gap-2">
                            <Mail className="w-4 h-4" />{entry.email}
                          </a>
                          {entry.phone && <div className="text-xs text-gray-500 mt-1">{entry.phone}</div>}
                        </td>
                        <td className="px-6 py-4 max-w-xs">
                          <p className="text-gray-400 truncate" title={entry.message}>{entry.message}</p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-sm">{formatDate(entry.timestamp)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <button onClick={() => handleDeleteContact(entry.id)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors" title="Delete contact">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}

          {activeTab === 'webinar' && (
            filteredWebinar.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg mb-2">
                  {searchTerm ? 'No matching registrations found' : 'No webinar registrations yet'}
                </p>
                <p className="text-gray-500 text-sm">
                  {searchTerm ? 'Try adjusting your search' : 'Registrations will appear here when users sign up'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">Registration Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredWebinar.map((entry, idx) => (
                      <motion.tr key={entry.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: idx * 0.05 }} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <a href={`mailto:${entry.email}`} className="text-gray-400 hover:text-brand-cyan transition-colors flex items-center gap-2">
                            <Mail className="w-4 h-4" />{entry.email}
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-400">{formatDate(entry.timestamp)}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </motion.div>

        {/* Footer Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-6 text-center text-sm text-gray-400"
        >
          {activeTab === 'waitlist' && `Showing ${filteredWaitlist.length} of ${waitlist.length} entries`}
          {activeTab === 'contacts' && `Showing ${filteredContacts.length} of ${contacts.length} contacts`}
          {activeTab === 'webinar' && `Showing ${filteredWebinar.length} of ${webinarList.length} registrations`}
        </motion.div>
      </main>
    </div>
  );
};
