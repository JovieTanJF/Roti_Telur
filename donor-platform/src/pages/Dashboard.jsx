

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
// Import the real transactions hook instead of the dummy one
import { useDonations } from '../hooks/useRealTransactions';
import Card, { CardHeader, CardTitle, CardContent, CardFooter } from '../components/Card';
import Button from '../components/Button';
import { formatDateTime, formatAddress, timeAgo } from '../utils/formatters';
import { topDonors, recentUpdates } from '../utils/dummyData';

const Dashboard = () => {
  const { address, balance, formatAddress } = useWallet();
  // Use the real transactions data from TheGraph subgraph
  const { donations, loading: txLoading } = useDonations(address);
  const [recentTxs, setRecentTxs] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (donations && donations.length > 0) {
      setRecentTxs(donations.slice(0, 3));
    }
  }, [donations]);
  
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    
    // Reset after 1 second for faster fade-out
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const services = [
    {
      name: 'Make Donation',
      description: 'Support a cause you care about',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      ),
      link: '/recipients',
      color: 'bg-purple-500/10 text-purple-500'
    },
    {
      name: 'Transaction History',
      description: 'View your donation history',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      ),
      link: '/wallet',
      color: 'bg-lavender-500/10 text-lavender-500'
    },
    {
      name: 'Recipient Organizations',
      description: 'Explore verified recipients',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      link: '/recipients',
      color: 'bg-pink-lavender-500/10 text-pink-lavender-500'
    },
    {
      name: 'Impact Report',
      description: 'See how your donations help',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
      link: '#',
      color: 'bg-pink-500/10 text-pink-500'
    },
  ];

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      {/* Enhanced Wallet Overview with animated background shapes */}
      <div className="mb-6 overflow-hidden rounded-xl shadow-lg relative">
        {/* Background design with animated shapes */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/90 via-lavender-500/80 to-pink-lavender-500/90 opacity-90">
          {/* Animated background shapes */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating circles with different animations */}
            <div className="h-40 w-40 rounded-full bg-white/10 absolute -top-20 -left-20 animate-float-slow"></div>
            <div className="h-56 w-56 rounded-full bg-white/10 absolute -bottom-32 -right-20 animate-float-slow-reverse"></div>
            <div className="h-24 w-24 rounded-full bg-white/5 absolute top-10 right-10 animate-pulse-slow delay-150"></div>
            
            {/* Animated SVG shapes */}
            <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" preserveAspectRatio="none">
              {/* Animated blob 1 */}
              <path 
                d="M0,500 C150,400 350,450 500,400 C650,350 750,450 1000,400 L1000,0 L0,0 Z" 
                fill="rgba(255, 255, 255, 0.05)"
                className="animate-morph"
              />
              
              {/* Animated blob 2 */}
              <path 
                d="M0,600 C200,550 300,650 500,600 C700,550 800,600 1000,550 L1000,0 L0,0 Z" 
                fill="rgba(255, 255, 255, 0.07)"
                className="animate-morph-delay"
              />
              
              {/* Animated wavy line */}
              <path 
                d="M0,720 C80,700 120,760 200,750 C280,740 320,700 400,720 C480,740 520,780 600,770 C680,760 720,720 800,750 C880,780 920,740 1000,720" 
                fill="none" 
                stroke="rgba(255, 255, 255, 0.1)" 
                strokeWidth="2"
                className="animate-dash"
              />
            </svg>
            
            {/* Animated dots grid */}
            <div className="absolute inset-0 opacity-30 animate-pulse-slow">
              <div className="h-full w-full" style={{backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)', backgroundSize: '30px 30px'}}></div>
            </div>
            
            {/* Geometric shapes */}
            <div className="absolute top-10 left-1/4 w-20 h-20 border-2 border-white/10 rounded-lg transform rotate-45 animate-rotate-slow"></div>
            <div className="absolute bottom-10 right-1/3 w-16 h-16 border-2 border-white/10 rounded-full animate-float-slow"></div>
            <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-white/5 transform rotate-12 animate-pulse-slow"></div>
          </div>
        </div>
        
        {/* Content */}
        <div className="backdrop-blur-sm p-1.5 relative z-10">
          <div className="bg-white/90 backdrop-blur-md rounded-lg p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="mb-4 lg:mb-0 flex items-center">
                <div className="mr-6 relative group">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-lavender-500 flex items-center justify-center shadow p-1 transition-all duration-300 group-hover:shadow-lg">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden relative">
                      {/* Wallet icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 text-purple-500 transition-all duration-300 group-hover:scale-110">
                        <path d="M19 5c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2s.9-2 2-2h10c1.1 0 2 .9 2 2Z"></path>
                        <path d="M21 8H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2Z"></path>
                        <path d="M16 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-400 border-2 border-white flex items-center justify-center shadow-md animate-bounce-slow">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-1">Donor Wallet</h2>
                  <div className="flex items-center">
                    <div className="font-mono text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md border border-gray-200">
                      {formatAddress(address)}
                    </div>
                    <button 
                      className="ml-2 text-purple-500 hover:text-purple-600 transition-colors relative group"
                      onClick={handleCopyAddress}
                      aria-label={copied ? "Copied!" : "Copy address"}
                    >
                      {/* Copy icon - hidden when copied */}
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className={`w-4 h-4 transition-opacity duration-200 ${copied ? 'opacity-0' : 'opacity-100'}`}
                      >
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                      </svg>
                      
                      {/* Check icon - shown when copied */}
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        className={`w-4 h-4 absolute inset-0 text-green-500 transition-opacity duration-200 ${copied ? 'opacity-100' : 'opacity-0'}`}
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      
                      {/* Tooltip - only shown when copied with faster fade-out */}
                      <span className={`absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap pointer-events-none ${
                        copied ? 'opacity-100 transition-opacity duration-75' : 'opacity-0 transition-opacity duration-200'
                      }`}>
                        Copied!
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 lg:gap-5 w-full lg:w-auto">
                <div className="rounded-lg bg-gradient-to-b from-gray-50 to-gray-100 shadow-sm border border-gray-200 p-3 text-center transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                  <div className="text-xs text-gray-500 mb-1">Available</div>
                  <div className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-lavender-500">{balance} ETH</div>
                  <div className="text-xs text-gray-400 mt-1">≈ $2,145.30</div>
                </div>
                
                <div className="rounded-lg bg-gradient-to-b from-gray-50 to-gray-100 shadow-sm border border-gray-200 p-3 text-center transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                  <div className="text-xs text-gray-500 mb-1">Donations</div>
                  <div className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-lavender-500 to-pink-lavender-500">12</div>
                  <div className="text-xs text-gray-400 mt-1">Last: 2 days ago</div>
                </div>
                
                <div className="rounded-lg bg-gradient-to-b from-gray-50 to-gray-100 shadow-sm border border-gray-200 p-3 text-center transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
                  <div className="text-xs text-gray-500 mb-1">Impact Score</div>
                  <div className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-lavender-500 to-pink-500">87</div>
                  <div className="text-xs text-green-500 mt-1 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 mr-1">
                      <polyline points="18 15 12 9 6 15"></polyline>
                    </svg>
                    12 points
                  </div>
                </div>
              </div>
              
              <div className="mt-4 lg:mt-0 lg:ml-4">
                <Link to="/recipients">
                  <Button variant="primary" size="md" className="shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]">
                    Donate Now
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 relative">
              {/* Modern glass-like background with subtle animation */}
              <div className="absolute inset-0 overflow-hidden rounded-b-lg pointer-events-none">
                {/* Subtle background texture */}
                <div className="absolute inset-0 opacity-[0.02]" 
                     style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")'}}>
                </div>
                
                {/* Modern glow effects */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-purple-500/10 blur-3xl"></div>
                <div className="absolute -bottom-8 -left-10 w-40 h-40 rounded-full bg-pink-500/10 blur-3xl"></div>
              </div>

              {/* Header with modern design */}
              <div className="relative z-10 mb-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-800">Recent Activity</h3>
                  <Link to="/wallet" className="text-xs text-purple-500 hover:text-purple-600 transition-colors flex items-center gap-1 px-2 py-1 rounded-full hover:bg-purple-50">
                    View all
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
              
              {/* Modern transaction list */}
              <div className="relative z-10 space-y-px">
                {recentTxs.length > 0 ? (
                  recentTxs.map((tx) => (
                    <div key={tx.id} className="group cursor-pointer">
                      <div className="relative p-3 hover:bg-gray-50 rounded-lg transition-all duration-300">
                        {/* Transaction card content with modern design */}
                        <div className="flex items-center gap-3">
                          {/* Status icon with animation */}
                          <div className={`relative flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                            tx.status === 'Completed' ? 'bg-green-50' : 'bg-amber-50'
                          }`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 ${
                              tx.status === 'Completed' ? 'text-green-500' : 'text-amber-500'
                            } transition-transform duration-300 group-hover:scale-110`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              {tx.status === 'Completed' ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              ) : (
                                <>
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </>
                              )}
                            </svg>
                          </div>
                          
                          {/* Transaction info */}
                          <div className="flex-grow min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium text-gray-800 truncate group-hover:text-purple-600 transition-colors">
                                {tx.recipientName}
                              </p>
                              <p className="text-sm font-semibold text-gray-800 ml-2">
                                {tx.amount}
                              </p>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                              <div className="flex items-center">
                                <p className="text-xs text-gray-500">{formatDateTime(tx.timestamp)}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className={`inline-flex w-1.5 h-1.5 rounded-full ${
                                  tx.status === 'Completed' ? 'bg-green-500' : 'bg-amber-500'
                                }`}></span>
                                <span className={`text-xs ${
                                  tx.status === 'Completed' ? 'text-green-600' : 'text-amber-600'
                                }`}>{tx.status}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Arrow indicator (positioned with enough space) */}
                          <div className="flex-shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        
                        {/* Hover indicator line */}
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-purple-500 opacity-0 group-hover:opacity-100 rounded-full transition-opacity duration-300"></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center py-8 text-gray-500 bg-gray-50/50 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm">No recent transactions</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Services section */}
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {services.map((service, index) => (
          <Link key={index} to={service.link}>
            <div className="rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] p-4 h-full flex flex-col border border-gray-100">
              <div className={`w-8 h-8 rounded-full ${service.color} flex items-center justify-center mb-3`}>
                {service.icon}
              </div>
              <h3 className="font-medium text-sm mb-1">{service.name}</h3>
              <p className="text-xs text-gray-500 flex-grow">{service.description}</p>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Bottom section with cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Leaderboard */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Top Donors Leaderboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topDonors.map((donor, index) => (
                <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      index === 0 ? 'bg-gradient-to-r from-yellow-300 to-yellow-500 text-white' :
                      index === 1 ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-white' :
                      index === 2 ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white' :
                      'bg-purple-500/10 text-purple-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="ml-2">
                      <p className="font-medium text-xs">{donor.address}</p>
                      <p className="text-xs text-gray-500">{donor.count} donations</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-xs">{donor.total}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* News & Updates */}
         {/* News & Updates with Image Slider */}
         <Card className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">News & Updates</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="relative overflow-hidden" style={{ height: "280px" }}>
              {/* News slider */}
              <div className="animate-slide-news absolute">
                {recentUpdates.map((update, index) => (
                  <div key={update.id} className="mb-4 flex flex-col w-full hover:bg-gray-50 transition-colors p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-md overflow-hidden bg-gradient-to-br from-purple-500/20 to-lavender-500/20 flex-shrink-0 shadow-sm">
                        <img
                          src={`/api/placeholder/${160}/${160}?text=News${index+1}`}
                          alt={update.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-xs text-gray-800">{update.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{timeAgo(update.date)}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">{update.description}</p>
                    <div className="mt-2 text-right">
                      <button className="text-xs text-purple-500 hover:text-purple-600 transition-colors">
                        Read more →
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* Duplicate first items to make the loop seamless */}
                {recentUpdates.slice(0, 2).map((update, index) => (
                  <div key={`duplicate-${update.id}`} className="mb-4 flex flex-col w-full hover:bg-gray-50 transition-colors p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-md overflow-hidden bg-gradient-to-br from-purple-500/20 to-lavender-500/20 flex-shrink-0 shadow-sm">
                        <img
                          src={`/api/placeholder/${160}/${160}?text=News${index+1}`}
                          alt={update.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-xs text-gray-800">{update.title}</h3>
                        <p className="text-xs text-gray-500 mt-1">{timeAgo(update.date)}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">{update.description}</p>
                    <div className="mt-2 text-right">
                      <button className="text-xs text-purple-500 hover:text-purple-600 transition-colors">
                        Read more →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Gradient overlays for top and bottom */}
              <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white to-transparent z-10"></div>
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent z-10"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;