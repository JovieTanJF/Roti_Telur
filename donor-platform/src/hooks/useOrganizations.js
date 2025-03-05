import { useState, useEffect } from 'react';
// import { useQuery } from '@apollo/client';
import { GET_ORGANIZATIONS } from '../graphql/queries';
import { organizations } from '../utils/dummyData';

export const useOrganizations = () => {
  const [allOrganizations, setAllOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // In a real app, we'd use this query
  /*
  const { data, loading, error } = useQuery(GET_ORGANIZATIONS);
  */

  useEffect(() => {
    // Simulate API loading delay
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
    // Simulate API loading delay
    const timer = setTimeout(() => {
      try {
        // Convert id to number since our dummy data uses numeric ids
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