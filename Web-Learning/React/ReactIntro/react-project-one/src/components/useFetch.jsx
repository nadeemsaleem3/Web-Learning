import { useState, useEffect } from 'react';

function useFetch(url, options = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      let isMounted = true;
  
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(url, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const result = await response.json();
          if (isMounted) {
            setData(result);
          }
        } catch (err) {
          console.error('Error fetching data:', err); // Log the error for debugging
          if (isMounted) {
            setError(err.message || 'Something went wrong');
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      };
  
      fetchData();
  
      return () => {
        isMounted = false;
      };
    }, [url, options]);
  
    return { data, loading, error };
  }  

export default useFetch;