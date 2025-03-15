import { create } from 'zustand';
import { persist } from 'zustand/middleware';  // 새로고침해도 데이터 유지

const useAccountStore = create(
    persist(
        (set, get) => ({
            profile: {
                // 기본 정보
                name: '',
                email: '',
                phone: '',
                introduction: '',
                profileImage: '/defaultProfile.png',  // 기본 이미지로 초기화

                // 급여 정보
                pay: {
                    amount: null,
                    type: 'hourly'
                },

                // 돌봄 유형
                careTypes: {
                    workTypes: [],
                    careGrade: '',
                    gender: '',
                    livingArrangement: '',
                    mealCare: '',
                    mobilitySupport: '',
                    dailyLife: ''
                },

                // 선호 지역
                locations: {},  // { "서울": ["강남구", "서초구"], "경기": ["수원시"] }

                // 근무 가능 시간
                schedules: {}  // { "월": { start: "9", end: "18" }, ... }
            },

            // 프로필 전체 업데이트
            setProfile: (newProfile) =>
                set({ profile: newProfile }),

            // 특정 필드만 업데이트
            updateProfile: (updates) =>
                set((state) => ({
                    profile: { ...state.profile, ...updates }
                })),

            // 프로필 저장
            saveProfile: async () => {
                try {
                    const { profile } = get();
                    // 백엔드 API 호출
                    // const response = await fetch('/api/helper/profile', {
                    //     method: 'PUT',
                    //     headers: {
                    //         'Content-Type': 'application/json',
                    //     },
                    //     body: JSON.stringify(profile)
                    // });

                    console.log('프로필 저장 (임시):', profile);

                    // 백엔드 연동 전 임시 처리
                    const response = {
                        ok: true,
                        json: () => Promise.resolve(profile)
                    };

                    if (!response.ok) {
                        throw new Error('프로필 저장 실패');
                    }


                    const updatedProfile = await response.json();
                    set({ profile: updatedProfile });

                    return updatedProfile;
                } catch (error) {
                    console.error('프로필 저장 중 오류:', error);
                    throw error;
                }
            },

            // 프로필 초기화
            resetProfile: () =>
                set({
                    profile: {
                        name: '',
                        email: '',
                        phone: '',
                        introduction: '',
                        profileImage: '/defaultProfile.png',
                        pay: {
                            amount: null,
                            type: 'hourly'
                        },
                        careTypes: {
                            workTypes: [],
                            careGrade: '',
                            gender: '',
                            livingArrangement: '',
                            mealCare: '',
                            mobilitySupport: '',
                            dailyLife: ''
                        },
                        locations: {},
                        schedules: {}
                    }
                })
        }),
        {
            name: 'account-storage',  // localStorage에 저장될 키 이름
            partialize: (state) => ({ profile: state.profile })  // profile만 저장
        }
    )
);

export default useAccountStore;