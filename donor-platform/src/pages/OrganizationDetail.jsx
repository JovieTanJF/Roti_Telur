import { useState } from 'react';
import { useParams } from 'react-router-dom';
import DonationModal from '../components/DonationModal';

const OrganizationDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donationSuccess, setDonationSuccess] = useState(false);
  const { id } = useParams();
  const { organization, loading, error } = useOrganization(id);

  const handleDonationClick = () => {
    if (!window.ethereum) {
      alert('Please install MetaMask to make donations');
      return;
    }
    setIsModalOpen(true);
  };

  const handleDonationSuccess = (receipt) => {
    console.log('Donation successful:', receipt);
    setDonationSuccess(true);
    setTimeout(() => setDonationSuccess(false), 5000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ... other JSX ... */}
      
      <Button 
        onClick={handleDonationClick}
        className="bg-purple-600 text-white px-6 py-2 rounded-lg"
      >
        Donate Now
      </Button>

      {organization && (
        <DonationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          organization={organization}
          onDonate={handleDonationSuccess}
        />
      )}
      
      {/* ... rest of the JSX ... */}
    </div>
  );
};

export default OrganizationDetail;