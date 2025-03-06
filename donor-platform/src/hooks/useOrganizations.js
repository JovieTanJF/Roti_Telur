import { useState, useEffect } from 'react';
import { organizations } from '../utils/dummyData';

export const useOrganizations = () => {
  const [allOrganizations, setAllOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setAllOrganizations(organizations);
        setLoading(false);
      } catch (err) {
        setError('Error loading organizations');
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return {
    organizations: allOrganizations,
    loading,
    error,
  };
};

export const useOrganization = (id) => {
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const numId = parseInt(id, 10);
        const found = organizations.find(org => org.id === numId);
        
        if (found) {
          setOrganization(found);
        } else {
          setError('Organization not found');
        }
        
        setLoading(false);
      } catch (err) {
        setError('Error loading organization details');
        setLoading(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [id]);

  return {
    organization,
    loading,
    error,
  };
};