import React, { useState } from 'react';
import { useOrganizations } from '../hooks/useOrganizations';
import Card, { CardHeader, CardTitle, CardContent } from '../components/Card';
import Button from '../components/Button';
import { formatAddress } from '../utils/formatters';

const Recipients = () => {
  const { organizations, loading, error } = useOrganizations();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique categories
  const categories = organizations ? ['All', ...new Set(organizations.map(org => org.category))] : ['All'];

  // Filter organizations based on category and search term
  const filteredOrganizations = organizations ? organizations.filter(org => {
    const matchesCategory = activeCategory === 'All' || org.category === activeCategory;
    const matchesSearch = org.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         org.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  }) : [];

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-xl font-bold text-gray-900 mb-4">Donation Recipients</h1>
      
      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Browse Verified Organizations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between space-y-3 md:space-y-0">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-2 py-1 text-xs rounded-full transition-colors ${
                    activeCategory === category 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-purple-500/10 hover:text-purple-500'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Search */}
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-gray-400">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
              <input
                type="text"
                className="pl-8 pr-4 py-1 border border-gray-300 rounded-md w-full text-xs focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Search organizations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      {loading ? (
        <div className="py-6 text-center text-gray-500">
          <svg className="animate-spin h-6 w-6 mx-auto text-purple-500 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-sm">Loading organizations...</p>
        </div>
      ) : error ? (
        <div className="py-6 text-center text-red-500">
          <p className="text-sm">{error}</p>
        </div>
      ) : filteredOrganizations.length === 0 ? (
        <div className="py-6 text-center text-gray-500">
          <p className="text-sm">No organizations found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOrganizations.map(org => (
            <Card key={org.id} className="hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-0">
                <div className="p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 bg-purple-500/10 rounded-full flex items-center justify-center overflow-hidden">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-purple-500">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                      </svg>
                    </div>
                    <div className="ml-2">
                      <h3 className="font-medium text-sm">{org.name}</h3>
                      <p className="text-xs text-gray-500">{org.category}</p>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-600 mb-3 line-clamp-3">{org.description}</p>
                  
                  <div className="mb-3">
                    <p className="text-xs text-gray-500">Wallet Address</p>
                    <p className="font-mono text-xs">{formatAddress(org.address)}</p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-xs text-gray-500">Total Donations Received</p>
                    <p className="text-sm font-semibold text-purple-500">{org.totalDonations}</p>
                  </div>
                </div>
                
                <div className="px-4 py-3 bg-purple-500/5 border-t border-purple-500/10">
                  <Button variant="primary" fullWidth={true} size="sm">
                    Donate Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Recipients;