import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import useHelperLocationStore from '@/store/suho/useHelperLocationStore';

const DISTRICTS = {
    서울: ["강남구", "서초구", "송파구", "강동구", "강북구", /* ... */],
    경기: ["수원시", "성남시", "고양시", "용인시", "부천시", /* ... */],
    // ... 다른 도시들의 상세 지역
};

export default function HelperLocationDetail() {
    const { city } = useParams();
    const navigate = useNavigate();
    const {
        selectedDistricts,
        addDistrict,
        removeDistrict,
        getTotalSelectedCount
    } = useHelperLocationStore();

    const MAX_SELECTIONS = 5;

    const handleDistrictClick = (district) => {
        const currentDistricts = selectedDistricts[city] || [];

        if (currentDistricts.includes(district)) {
            removeDistrict(city, district);
        } else {
            if (getTotalSelectedCount() >= MAX_SELECTIONS) {
                alert(`최대 ${MAX_SELECTIONS}개의 상세 지역까지 선택 가능합니다.`);
                return;
            }
            addDistrict(city, district);
        }
    };

    return (
        <main className="max-w-md mx-auto flex flex-col  gap-4 p-4">
            <Header title={`${city} 상세 지역`} />

            <div className="text-left space-y-2 w-full">
                <span className="block">{city}의 상세 지역을 선택해 주세요</span>
                <span className="block">(전체 최대 5개 지역 선택 가능)</span>
            </div>

            <div className="w-full grid grid-cols-3 gap-2">
                {DISTRICTS[city]?.map((district) => (
                    <Button
                        key={district}
                        onClick={() => handleDistrictClick(district)}
                        className={`h-[3.5rem] text-base
                            ${selectedDistricts[city]?.includes(district)
                                ? 'bg-[var(--helper-primary)] text-white'
                                : 'bg-white text-black border border-gray-300'
                            }`}
                    >
                        {district}
                    </Button>
                ))}
            </div>

            <div className="w-full text-left">
                <span>
                    선택된 지역: {
                        Object.entries(selectedDistricts)
                            .filter(([_, districts]) => districts.length > 0)
                            .map(([cityName, districts]) =>
                                districts.map(district => `${cityName}-${district}`)
                            )
                            .flat()
                            .join(', ') || '없음'
                    }
                </span>
                <span>({getTotalSelectedCount()}/{MAX_SELECTIONS})</span>
            </div>

            <Button
                className="w-full"
                onClick={() => navigate('/helper/location')}
            >
                선택 완료
            </Button>
        </main>
    );
}