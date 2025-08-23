import { useCallback } from 'react';

export const useAddressSearch = (onAddressSelect) => {
  const handleSearchAddress = useCallback(() => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let basicAddr = '';
        let extraAddr = '';

        if (data.userSelectedType === 'R') {
          basicAddr = data.roadAddress;
        } else {
          basicAddr = data.jibunAddress;
        }

        if (data.userSelectedType === 'R') {
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
          }
          if (extraAddr !== '') {
            extraAddr = ` (${extraAddr})`;
          }
        }

        const addressData = {
          postcode: data.zonecode,
          basicAddress: basicAddr,
          extraAddress: extraAddr,
        };

        if (onAddressSelect) {
          onAddressSelect(addressData);
        }
      },
    }).open();
  }, [onAddressSelect]);

  return { handleSearchAddress };
};
