import { useEffect, useState } from 'react';
import { regions } from 'select-philippines-address';

export const useSelectRegion = () => {
  const [regionsState, setRegionsState] = useState(null);

  useEffect(() => {
    regions().then((region) => setRegionsState(region));
  }, []);

  return regionsState;
};