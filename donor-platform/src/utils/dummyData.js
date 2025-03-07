export const transactions = [
    {
      id: "0xabc123def456",
      donor: "0x1234...5678",
      recipient: "0xabcd...ef01",
      recipientName: "Global Relief Foundation",
      amount: "0.05 ETH",
      timestamp: "2025-03-04T10:30:00Z",
      status: "Completed",
      gasUsed: "0.002 ETH",
      confirmations: 12,
      estimatedTime: "Completed",
    },
    {
      id: "0x789def012345",
      donor: "0x1234...5678",
      recipient: "0x2345...6789",
      recipientName: "Children's Education Fund",
      amount: "0.1 ETH",
      timestamp: "2025-03-02T14:45:00Z",
      status: "Completed",
      gasUsed: "0.0025 ETH",
      confirmations: 68,
      estimatedTime: "Completed",
    },
    {
      id: "0xfed987cba654",
      donor: "0x1234...5678",
      recipient: "0x3456...7890",
      recipientName: "Ocean Conservation Project",
      amount: "0.025 ETH",
      timestamp: "2025-03-01T09:15:00Z",
      status: "Completed",
      gasUsed: "0.0018 ETH",
      confirmations: 72,
      estimatedTime: "Completed",
    },
    {
      id: "0x123456abcdef",
      donor: "0x1234...5678",
      recipient: "0x4567...8901",
      recipientName: "Disaster Relief Fund",
      amount: "0.2 ETH",
      timestamp: "2025-02-28T16:20:00Z",
      status: "Completed",
      gasUsed: "0.0031 ETH",
      confirmations: 102,
      estimatedTime: "Completed",
    },
    {
      id: "0xab12cd34ef56",
      donor: "0x1234...5678",
      recipient: "0x5678...9012",
      recipientName: "Renewable Energy Initiative",
      amount: "0.075 ETH",
      timestamp: "2025-02-25T11:50:00Z",
      status: "Completed",
      gasUsed: "0.0022 ETH",
      confirmations: 156,
      estimatedTime: "Completed",
    },
  ];
  
  export const pendingTransactions = [
    {
      id: "0xab12cd34ef99",
      donor: "0x1234...5678",
      recipient: "0x6789...0123",
      recipientName: "Wildlife Conservation Trust",
      amount: "0.15 ETH",
      timestamp: "2025-03-05T08:20:00Z",
      status: "Pending",
      gasUsed: "0.0028 ETH",
      confirmations: 2,
      estimatedTime: "~10 minutes",
    },
  ];
  
  export const organizations = [
    {
      id: 1,
      name: "Save The Children",
      address: "0xe455621A437ea29cb6a645ed9E4C73E94C233a99",
      description: "Supporting children's education and healthcare worldwide",
      totalDonations: "2.5 ETH",
      category: "Education",
      logo: "/logos/org-1.png"
    },
    {
      id: 2,
      name: "Ocean Cleanup Initiative",
      address: "0xe455621A437ea29cb6a645ed9E4C73E94C233a99",
      description: "Removing plastic waste from our oceans",
      totalDonations: "1.8 ETH",
      category: "Environment",
      logo: "/logos/org-2.png"
    },
    {
      id: 3,
      name: "Tech For All",
      address: "0xe455621A437ea29cb6a645ed9E4C73E94C233a99",
      description: "Bringing technology education to underserved communities",
      totalDonations: "3.2 ETH",
      category: "Technology",
      logo: "/logos/org-3.png"
    },
    {
      id: 4,
      name: "Global Health Fund",
      address: "0xe455621A437ea29cb6a645ed9E4C73E94C233a99",
      description: "Providing medical care to those in need",
      totalDonations: "4.1 ETH",
      category: "Healthcare",
      logo: "/logos/org-4.png"
    }
  ];
  
  export const topDonors = [
    { address: "0xdef1...2345", total: "18.5 ETH", count: 12 },
    { address: "0xbcd9...0123", total: "15.2 ETH", count: 8 },
    { address: "0x1234...5678", total: "12.7 ETH", count: 10 },
    { address: "0x9876...5432", total: "11.3 ETH", count: 6 },
    { address: "0xfedc...ba98", total: "9.8 ETH", count: 7 },
  ];
  
  export const recentUpdates = [
    {
      id: 1,
      title: "New Organization Onboarded",
      description: "Wildlife Conservation Trust has joined our platform to raise funds for their new habitat preservation initiative in Southeast Asia.",
      date: "2025-03-04",
    },
    {
      id: 2,
      title: "Platform Upgrade Complete",
      description: "We've improved transaction speeds and reduced gas fees by optimizing our smart contracts, resulting in 30% faster processing times.",
      date: "2025-03-02",
    },
    {
      id: 3,
      title: "Impact Report: Global Relief Foundation",
      description: "Thanks to your donations, Global Relief Foundation has provided clean water to 5,000 people in drought-affected regions across Africa.",
      date: "2025-02-28",
    },
    {
      id: 4,
      title: "New Feature: Recurring Donations",
      description: "You can now set up automated recurring donations to your favorite causes and track their cumulative impact over time.",
      date: "2025-02-25",
    },
    {
      id: 5,
      title: "Community Milestone Reached",
      description: "Our platform has surpassed $1 million in total donations! Thank you to all our generous donors making a difference worldwide.",
      date: "2025-02-20",
    },
    {
      id: 6,
      title: "Donor Spotlight: Anonymous Hero",
      description: "An anonymous donor contributed 50 ETH to multiple children's education initiatives, helping fund school supplies for underserved communities.",
      date: "2025-02-15",
    },
    {
      id: 7,
      title: "Upcoming Charity Event",
      description: "Join our virtual charity gala on March 15th featuring special guests and live updates from organizations around the world.",
      date: "2025-02-10",
    },
    {
      id: 8,
      title: "Mobile App Launch",
      description: "Our new mobile app is now available for download, allowing you to track donations and discover causes on the go.",
      date: "2025-02-05",
    },
  ];