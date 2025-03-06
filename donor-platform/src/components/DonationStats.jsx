import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import Card, { CardHeader, CardTitle, CardContent } from './Card';
import { ethers } from 'ethers';

const GET_DONATION_STATS = gql`
  query GetDonationStats {
    donors(first: 5, orderBy: totalDonated, orderDirection: desc) {
      id
      totalDonated
      donationCount
    }
    donations(first: 100) {
      id
      amount
    }
  }
`;

const DonationStats = () => {
  const { data, loading, error } = useQuery(GET_DONATION_STATS);

  if (loading) return (
    <div className="py-4 text-center text-gray-500">
      <svg className="animate-spin h-6 w-6 mx-auto text-purple mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <p>Loading statistics...</p>
    </div>
  );

  if (error) return (
    <div className="py-4 text-center text-red-500">
      <p>Error loading donation statistics</p>
    </div>
  );

  // Calculate total donations
  const totalDonated = data?.donations.reduce((sum, donation) => {
    return sum.add(ethers.BigNumber.from(donation.amount));
  }, ethers.BigNumber.from(0)) || ethers.BigNumber.from(0);

  // Format for display
  const formattedTotal = ethers.utils.formatEther(totalDonated);
  const donationCount = data?.donations.length || 0;
  const donorCount = new Set(data?.donations.map(d => d.donor) || []).size;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Total Donated</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-purple">{formattedTotal} ETH</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Total Donations</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-purple">{donationCount}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Total Donors</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-purple">{donorCount}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationStats;