import { useEffect, useState } from 'react';
import { cities } from 'select-philippines-address';

export const useSelectCity = () => {
  const [provinceCode, setProvinceCode] = useState(null);
  const [citiesState, setCitiesState] = useState(null);

  useEffect(() => {
    cities(provinceCode).then((city) => setCitiesState(city));
  }, [provinceCode]);

  return [citiesState, setProvinceCode];
};