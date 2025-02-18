import { useEffect } from 'react';
import useAddressStore from '@/store/useAddressStore';

export default function AddressSearch({ onAddressChange }) {
  const { selectedAddress, setSelectedAddress } = useAddressStore();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); //cleanup script when component unmounts
    };
  }, []);

  /**
   * Open address search modal
   */
  const openAddressSearch = () => {
    new daum.Postcode({
      oncomplete: (data) => {
        let fullAddress = data.address;
        if (data.buildingName) {
          fullAddress += ` ${data.buildingName}`;
        }
        setSelectedAddress(fullAddress);
      },
    }).open();
  };

  return <div>{/* Address input(readonly) */}</div>;
}
