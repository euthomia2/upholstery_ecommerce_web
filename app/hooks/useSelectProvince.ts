import { useEffect, useState } from 'react';
import { provinces } from 'select-philippines-address';

export const useSelectProvince = () => {
  const [regionCode, setRegionCode] = useState(null);
  const [provincesState, setProvincesState] = useState(null);

  useEffect(() => {
    provinces(regionCode).then((province) => {
      setProvincesState(province);
    });
  }, [regionCode]);

  return [provincesState, setRegionCode];
};