import { Link } from 'react-router-dom';
import DonationStats from '../components/DonationStats';
import Button from '../components/Button';

const Home = () => {
  return (
    <div className="container mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to DonorChain</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A transparent and secure blockchain platform for making donations to verified organizations.
        </p>
      </div>
      
      <DonationStats />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-8 rounded-radius-card shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Make a Donation</h2>
          <p className="text-gray-600 mb-6">
            Support causes you care about with transparent, blockchain-verified donations.
          </p>
          <Link to="/organizations">
            <Button>Browse Organizations</Button>
          </Link>
        </div>
        
        <div className="bg-white p-8 rounded-radius-card shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Track Your Impact</h2>
          <p className="text-gray-600 mb-6">
            View your donation history and see the impact you're making.
          </p>
          <Link to="/wallet">
            <Button variant="secondary">View Your Donations</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;