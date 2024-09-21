import { useState, useEffect } from 'react';
import { getQueries } from '../services/queryService';

const useQueries = () => {
  const [queries, setQueries] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getQueries();
      setQueries(data);
    };
    
    fetchData();
  }, []);
  
  return queries;
};

export default useQueries;