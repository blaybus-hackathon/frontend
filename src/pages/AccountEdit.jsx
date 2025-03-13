import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';


import { Input } from '@/components/ui/Components/input'
import { TextAreaInput } from "@/components/ui/TextAreaInput"

import Header from '@/components/Header';

import useAccountStore from '@/store/suho/useAccountStore';
import useHelperLocationStore from '@/store/suho/useHelperLocationStore';
import useScheduleStore from '@/store/suho/useScheduleStore';
import usePayStore from '@/store/suho/usePayStore';
import useCareTypeStore, { CARE_TYPES } from '@/store/suho/useCareTypeStore';


export default function AccountEdit() {

    const navigate = useNavigate();
    const location = useLocation();


    const profile = useAccountStore(state => state.profile);
    const updateProfile = useAccountStore(state => state.updateProfile);
    const saveProfile = useAccountStore(state => state.saveProfile);

    // PayStore
    const selectedPay = usePayStore(state => state.selectedPay);
    const payType = usePayStore(state => state.payType);
    const setPay = usePayStore(state => state.setPay);

    // CareTypeStore
    const selectedTypes = useCareTypeStore(state => state.selectedTypes);
    const setCareTypes = useCareTypeStore(state => state.setSelection);

    // LocationStore
    const selectedDistricts = useHelperLocationStore(state => state.selectedDistricts);
    const setDistricts = useHelperLocationStore(state => state.setDistricts);

    // ScheduleStore
    const schedules = useScheduleStore(state => state.schedules);
    const setSchedules = useScheduleStore(state => state.setAllSchedules);

    const [editedProfile, setEditedProfile] = useState(profile);

    useEffect(() => {
        if (profile) {
            setEditedProfile(profile);
        }
    }, [profile]);

    useEffect(() => {
        // Account 페이지에서 왔을 때만 초기화
        if (location.state?.from === '/helper/account' && profile) {
            setEditedProfile(profile);

            // 각 Store 초기화
            if (profile.pay) setPay(profile.pay);
            if (profile.careTypes) {
                Object.entries(profile.careTypes).forEach(([key, value]) => {
                    setCareTypes(key, value);
                });
            }
            if (profile.locations) setDistricts(profile.locations);
            if (profile.schedules) setSchedules(profile.schedules);
        }
    }, [profile]);



    const handleBasicInfoChange = (field, value) => {
        setEditedProfile(prev => ({
            ...prev,
            [field]: value
        }));
    };



    const getCareTypeLabel = (category) => {
        if (category === 'workTypes') {
            return selectedTypes.workTypes?.map(type =>
                CARE_TYPES.workTypes.find(t => t.id === type)?.label
            ).join(', ') || '미설정';
        }
        const selected = CARE_TYPES[category]?.find(
            item => item.id === selectedTypes[category]
        );
        return selected?.label || '미설정';
    };

    const handleSave = async () => {
        try {
            // 모든 Store의 현재 상태로 새 프로필 생성
            const newProfile = {
                ...editedProfile,
                pay: {
                    amount: selectedPay,
                    type: payType
                },
                careTypes: selectedTypes,
                locations: selectedDistricts,
                schedules: schedules
            };

            // 한 번에 저장
            updateProfile(newProfile);
            await saveProfile();
            navigate('/helper/account');
        } catch (error) {
            console.error('프로필 저장 실패:', error);
        }
    };

    const handleCancel = () => {
        navigate('/helper/account');
    };



    return (
        <main className="max-w-md mx-auto flex flex-col gap-6 p-4">
            <Header title="프로필 수정" />

            {/* 기본 정보 섹션 */}
            <section className="space-y-4">
                <h2 className="font-semibold">기본 정보</h2>

                {/* 프로필 이미지 */}
                <div className="flex flex-col items-center gap-2">
                    <div className="relative w-24 h-24">
                        <img
                            src={editedProfile?.profileImage || '/defaultProfile.png'}
                            alt="프로필 이미지"
                            className="w-full h-full rounded-full object-cover"
                        />
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="profile-image"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    // 이미지 미리보기 URL 생성
                                    const imageUrl = URL.createObjectURL(file);
                                    handleBasicInfoChange('profileImage', imageUrl);
                                }
                            }}
                        />
                        <label
                            htmlFor="profile-image"
                            className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full cursor-pointer hover:bg-primary/90"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                        </label>
                    </div>
                </div>

                <div className="space-y-2">



                    <Input
                        value={editedProfile?.name || ''}           // profile -> editedProfile
                        onChange={(e) => handleBasicInfoChange('name', e.target.value)}
                        placeholder="이름"
                    />
                    <Input
                        value={editedProfile?.phone || ''}          // profile -> editedProfile
                        onChange={(e) => handleBasicInfoChange('phone', e.target.value)}
                        placeholder="연락처"
                    />
                    <TextAreaInput
                        value={editedProfile?.introduction || ''}    // profile -> editedProfile
                        onChange={(e) => handleBasicInfoChange('introduction', e.target.value)}
                        placeholder="자기소개"
                        className="min-h-[100px]"
                    />
                </div>
            </section>

            {/* 급여 섹션 */}
            <section className="space-y-4">
                <h2 className="font-semibold">희망 급여</h2>
                <div>
                    <div className="mb-2">
                        {selectedPay
                            ? `${payType === 'hourly' ? '시급' : payType === 'daily' ? '일급' : '주급'} ${selectedPay.toLocaleString()}원`
                            : '설정된 급여가 없습니다.'}
                    </div>
                    <Button
                        type="button"
                        onClick={() => navigate('/helper/account/pay')}
                    >
                        급여 설정하기
                    </Button>
                </div>
            </section>

            {/* 돌봄 유형 섹션 */}
            <section className="space-y-4">
                <h2 className="font-semibold">돌봄 유형</h2>
                <div>
                    <div className="mb-4 space-y-2 text-sm">
                        <p>
                            <span className="text-gray-500">근무 종류: </span>
                            {getCareTypeLabel('workTypes')}
                        </p>
                        <p>
                            <span className="text-gray-500">장기요양등급: </span>
                            {getCareTypeLabel('careGrade')}
                        </p>
                        <p>
                            <span className="text-gray-500">성별: </span>
                            {getCareTypeLabel('gender')}
                        </p>
                        <p>
                            <span className="text-gray-500">동거인 여부: </span>
                            {getCareTypeLabel('livingArrangement')}
                        </p>
                        <p>
                            <span className="text-gray-500">식사보조: </span>
                            {getCareTypeLabel('mealCare')}
                        </p>
                        <p>
                            <span className="text-gray-500">이동보조: </span>
                            {getCareTypeLabel('mobilitySupport')}
                        </p>
                        <p>
                            <span className="text-gray-500">일상생활: </span>
                            {getCareTypeLabel('dailyLife')}
                        </p>
                    </div>
                    <Button
                        type="button"
                        onClick={() => navigate('/helper/account/care-type')}
                    >
                        돌봄 유형 설정하기
                    </Button>
                </div>
            </section>

            {/* 선호 지역 섹션 */}
            <section className="space-y-4">
                <h2 className="font-semibold">선호 지역</h2>
                <div>
                    <div className="mb-2">
                        {Object.entries(selectedDistricts)
                            .filter(([_, districts]) => districts.length > 0)
                            .map(([city, districts]) =>
                                districts.map(district => `${city}-${district}`)
                            )
                            .flat()
                            .join(', ') || '선택된 지역이 없습니다.'}
                    </div>
                    <Button
                        type="button"
                        onClick={() => navigate('/helper/location')}
                    >
                        지역 설정하기
                    </Button>
                </div>
            </section>

            {/* 근무 가능 시간 섹션 */}
            <section className="space-y-4">
                <h2 className="font-semibold">근무 가능 시간</h2>
                <div>
                    <div className="mb-2">
                        {Object.entries(schedules)
                            .map(([day, time]) =>
                                `${day}요일 ${time.start}시-${time.end}시`
                            )
                            .join(', ') || '설정된 근무시간이 없습니다.'}
                    </div>
                    <Button
                        type="button"
                        onClick={() => navigate('/helper/account/schedule')}
                    >
                        근무시간 설정하기
                    </Button>
                </div>
            </section>

            {/* 저장/취소 버튼 */}
            <div className="flex gap-2">
                <Button
                    type="button"
                    onClick={handleSave}
                    className="flex-1"
                >
                    저장
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={handleCancel}
                >
                    취소
                </Button>
            </div>
        </main>
    );
}