import { useState, useEffect } from 'react';

export default function AddressSearch({ onAddressSelect, selectedAddress }) {
    const [postcode, setPostcode] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [extraAddress, setExtraAddress] = useState('');

    // 다음 우편번호 스크립트 로드
    useEffect(() => {
        const script = document.createElement('script');
        script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // 우편번호 검색 함수
    const handleClick = () => {
        new window.daum.Postcode({
            oncomplete: function (data) {
                let addr = '';
                let extraAddr = '';

                if (data.userSelectedType === 'R') {
                    addr = data.roadAddress;
                } else {
                    addr = data.jibunAddress;
                }

                if (data.userSelectedType === 'R') {
                    if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                        extraAddr += data.bname;
                    }
                    if (data.buildingName !== '' && data.apartment === 'Y') {
                        extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                    }
                    if (extraAddr !== '') {
                        extraAddr = ` (${extraAddr})`;
                    }
                    setExtraAddress(extraAddr);
                } else {
                    setExtraAddress('');
                }

                setPostcode(data.zonecode);
                setAddress(addr);

                // 부모 컴포넌트로 전체 주소 데이터 전달
                const fullAddress = {
                    postcode: data.zonecode,
                    address: addr,
                    extraAddress: extraAddr
                };
                onAddressSelect(fullAddress);
            }
        }).open();
    };

    // 상세주소 변경 시
    const handleDetailAddressChange = (e) => {
        const detail = e.target.value;
        setDetailAddress(detail);

        // 부모 컴포넌트로 전체 주소 데이터 전달
        const fullAddress = {
            postcode,
            address,
            detailAddress: detail,
            extraAddress
        };
        onAddressSelect(fullAddress);
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={postcode}
                    placeholder="우편번호"
                    readOnly
                    className="flex-1 p-2 border rounded"
                />
                <button
                    onClick={handleClick}
                    className="px-4 py-2 bg-[var(--helper-primary)] text-white rounded"
                >
                    우편번호 찾기
                </button>
            </div>

            <input
                type="text"
                value={address}
                placeholder="주소"
                readOnly
                className="w-full p-2 border rounded"
            />

            <input
                type="text"
                value={detailAddress}
                onChange={handleDetailAddressChange}
                placeholder="상세주소"
                className="w-full p-2 border rounded"
            />

            <input
                type="text"
                value={extraAddress}
                placeholder="참고항목"
                readOnly
                className="w-full p-2 border rounded"
            />
        </div>
    );
}