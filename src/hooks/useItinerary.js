import { useState, useEffect } from 'react';
import { getItineraries } from '../services/itineraryService';

const useItinerary = () => {
  const [itineraries, setItineraries] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await getItineraries();
      setItineraries(data);
    };
    
    fetchData();
  }, []);
  
  return itineraries;
};

export default useItinerary;