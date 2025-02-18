import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useSignupStore = create(
    persist(
        (set) => ({
            // 회원가입 데이터
            signupData: {
                // SecondStep 데이터
                email: '',
                isEmailVerified: false,

                // ThirdStep 데이터
                name: '',
                phone: '',
                addressData: {
                    postcode: '',
                    address: '',
                    detailAddress: '',
                    extraAddress: ''
                },
                car: null,
                dementia: null,
                licenses: [],
                licenseDetails: {
                    license1: '',
                    license2: '',
                    license3: '',
                    license4: '',
                    license5: ''
                }
            },

            // 이메일 관련 메서드
            setEmail: (email) => set((state) => ({
                signupData: { ...state.signupData, email }
            })),

            setEmailVerified: (isVerified) => set((state) => ({
                signupData: { ...state.signupData, isEmailVerified }
            })),

            // 전체 데이터 초기화
            resetSignupData: () => set({
                signupData: {
                    email: '',
                    isEmailVerified: false,
                    name: '',
                    phone: '',
                    addressData: {
                        postcode: '',
                        address: '',
                        detailAddress: '',
                        extraAddress: ''
                    },
                    car: null,
                    dementia: null,
                    licenses: [],
                    licenseDetails: {
                        license1: '',
                        license2: '',
                        license3: '',
                        license4: '',
                        license5: ''
                    }
                }
            })
        }),
        {
            name: 'signup-storage'  // localStorage에 저장될 키 이름
        }
    )
);

export default useSignupStore;