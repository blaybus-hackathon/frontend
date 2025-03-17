import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import useAuthStore from '@/store/suho/useAuthStore';
import axios from 'axios';


export default function ThirdStep({ onNext, onPrev }) {

        const navigate = useNavigate();  // 추가
        const [newOtherCert, setNewOtherCert] = useState('');
        const handleAddOtherCert = () => {
                if (newOtherCert.trim()) {
                        addHelperOtherCert(newOtherCert.trim());
                        setNewOtherCert('');  // 입력 필드 초기화
                }
        };

        const [certToggles, setCertToggles] = useState({
                essential: false,
                care: false,
                nurse: false,
                postPartum: false,
                other: false
        });

        const toggleCert = (certType) => {
                setCertToggles(prev => {
                        const newValue = !prev[certType];

                        // 토글이 꺼질 때 해당 자격증 데이터 초기화
                        if (!newValue) {
                                switch (certType) {
                                        case 'essential':
                                                setEssentialCertNo('');
                                                break;
                                        case 'care':
                                                setCareCertNo('');
                                                break;
                                        case 'nurse':
                                                setNurseCertNo('');
                                                break;
                                        case 'postPartum':
                                                setPostPartumCertNo('');
                                                break;
                                        case 'other':
                                                setHelperOtherCerts([]); // 기타 자격증 목록 초기화
                                                setNewOtherCert(''); // 입력 필드도 초기화
                                                break;
                                }
                        }

                        return {
                                ...prev,
                                [certType]: newValue
                        };
                });
        };

        const store = useAuthStore();


        const {
                email,
                password,
                name,
                phone,
                addressDetail,
                carOwnYn,
                eduYn,

                essentialCertNo,
                careCertNo,
                nurseCertNo,
                postPartumCertNo,
                helperOtherCerts,

                setPassword,
                setName,
                setPhone,
                setAddressDetail,
                setCarOwnYn,
                setEduYn,

                setHelperOtherCerts,
                setEssentialCertNo,
                setCareCertNo,
                setNurseCertNo,
                setPostPartumCertNo,

                addHelperOtherCert,

                removeHelperOtherCert,

                clearAll
        } = useAuthStore();

        const handleDebug = () => {
                console.log('Current Store State:', store);
        };

        const handleSignUp = async () => {
                try {
                        const signUpData = {
                                "email": email,
                                "password": password,
                                "roleType": "MEMBER",
                                "name": name,
                                "phone": phone,
                                "addressDetail": addressDetail,
                                "carOwnYn": carOwnYn,
                                "eduYn": eduYn,
                                "essentialCertNo": essentialCertNo,
                                "careCertNo": careCertNo,
                                "nurseCertNo": nurseCertNo,
                                "postPartumCertNo": postPartumCertNo,
                                "helperOtherCerts": helperOtherCerts
                        };

                        const response = await axios.put(
                                'http://localhost:8080/api/sign/up/helper',
                                signUpData,
                                {
                                        headers: {
                                                'Content-Type': 'application/json'
                                        }
                                }
                        );

                        if (response.status === 200) {
                                console.log('회원가입 성공');
                                console.log(response.data);
                                clearAll();
                                navigate('/');  // 홈페이지로 이동


                        }
                } catch (error) {
                        console.error('회원가입 실패:', error);
                        alert('회원가입 중 오류가 발생했습니다.');
                }
        };


        const handleNext = () => {
                // 필수가 선택되었는지 체크할 필요가 있음
                onNext();
        };

        // 자격증 입력 유효성 검사
        const isLicenseValid = () => {
                // 최소 하나의 자격증 번호가 입력되어 있어야 함
                return essentialCertNo || careCertNo || nurseCertNo || postPartumCertNo || helperOtherCerts.length > 0;
        };

        const handlePrev = () => {
                onPrev();
        };



        return (
                <main className="flex flex-col gap-1 max-w-2xl mx-auto">


                        <p className="text-left font-bold">회원가입을 위해<br />개인정보를 입력해주세요!</p>

                        {/* 이메일 표시 영역 */}
                        <div className="flex items-center gap-2 mt-6">
                                <span className="font-bold">이메일</span>
                        </div>
                        <Input
                                value={email}
                                readOnly  // 읽기 전용으로 설정
                                className="h-12 bg-gray-100"  // 배경색으로 비활성화 표시
                        />

                        {/* 비밀번호 */}
                        <div className="flex items-center gap-2 mt-4 ">
                                <span className="font-bold">비밀번호</span>
                                <span className="text-sm text-red-500">필수</span>
                        </div>
                        <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호를 입력해주세요."
                                className="h-12"
                        />

                        <div className="flex items-center gap-2 mt-4 ">
                                <span className="font-bold">이름</span>
                                <span className="text-sm text-red-500">필수</span>
                        </div>

                        {/* 이름 */}
                        <Input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="예) 홍길동"
                                className="h-12"
                        />

                        <div className="flex items-center gap-2 mt-4 ">
                                <span className="font-bold">전화번호</span>
                                <span className="text-sm text-red-500">필수</span>
                        </div>

                        {/* 전화번호 */}
                        <Input
                                id="phone"
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="예) 010-0000-0000"
                                className="h-12"
                        />

                        <div className="flex items-center gap-2 mt-4 ">
                                <span className="font-bold">주소</span>
                                <span className="text-sm text-red-500">필수</span>
                        </div>

                        {/* 주소 */}
                        <Input
                                id="address"
                                type="text"
                                value={addressDetail}
                                onChange={(e) => setAddressDetail(e.target.value)}
                                placeholder="예) 서울특별시 강남구 테헤란로 14길 6 남도빌딩 3층"
                                className="h-12"
                        />




                        {/* 차량소유여부 */}
                        <div className="flex items-center gap-2 mt-4 ">
                                <span className="font-bold">차량소유여부</span>
                                <span className="text-sm text-red-500">필수</span>
                        </div>
                        <div className="flex gap-6 items-center justify-center">
                                <Button
                                        className="flex gap-2 bg-white hover:bg-white text-black border border-gray-300"
                                        onClick={() => setCarOwnYn(true)}
                                >
                                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="29" height="29" rx="14.5" fill={carOwnYn === true ? "var(--helper-primary)" : "#B6B6B6"} />
                                                <path d="M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z" fill="white" />
                                        </svg>
                                        예
                                </Button>
                                <Button
                                        className="flex gap-2 bg-white hover:bg-white text-black border border-gray-300"
                                        onClick={() => setCarOwnYn(false)}
                                >
                                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="29" height="29" rx="14.5" fill={carOwnYn === false ? "var(--helper-primary)" : "#B6B6B6"} />
                                                <path d="M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z" fill="white" />
                                        </svg>
                                        아니요
                                </Button>
                        </div>

                        {/* 치매교육 이수 여부 */}
                        <div className="flex items-center gap-2 mt-4 ">
                                <span className="font-bold">치매교육 이수 여부</span>
                                <span className="text-sm text-red-500">필수</span>
                        </div>
                        <div className="flex gap-6 justify-center">
                                <Button
                                        className="flex gap-2 bg-white hover:bg-white text-black border border-gray-300"
                                        onClick={() => setEduYn(true)}
                                >
                                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="29" height="29" rx="14.5" fill={eduYn === true ? "var(--helper-primary)" : "#B6B6B6"} />
                                                <path d="M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z" fill="white" />
                                        </svg>
                                        예
                                </Button>
                                <Button
                                        className="flex items-center gap-2 bg-white hover:bg-white text-black border border-gray-300"
                                        onClick={() => setEduYn(false)}
                                >
                                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="29" height="29" rx="14.5" fill={eduYn === false ? "var(--helper-primary)" : "#B6B6B6"} />
                                                <path d="M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z" fill="white" />
                                        </svg>
                                        아니요
                                </Button>
                        </div>

                        <div className="flex items-center gap-2 mt-4 ">
                                <span className="font-bold">자격증 등록</span>
                                <span className="text-sm text-red-500">필수</span>
                        </div>

                        <div className="flex flex-col gap-3">
                                {/* 요양보호사 */}
                                <Button
                                        className="flex items-center gap-2 bg-white hover:bg-white text-black border border-gray-300"
                                        onClick={() => toggleCert('essential')}
                                >
                                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="29" height="29" rx="14.5" fill={certToggles.essential ? "var(--helper-primary)" : "#B6B6B6"} />
                                                <path d="M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z" fill="white" />
                                        </svg>
                                        요양보호사
                                </Button>
                                {certToggles.essential && (
                                        <div className="mt-2">
                                                <Input
                                                        type="text"
                                                        placeholder="자격증번호를 입력해주세요"
                                                        value={essentialCertNo}
                                                        onChange={(e) => setEssentialCertNo(e.target.value)}
                                                        className="w-full"
                                                />
                                        </div>
                                )}

                                {/* 간병사 */}
                                <Button
                                        className="flex items-center gap-2 bg-white hover:bg-white text-black border border-gray-300"
                                        onClick={() => toggleCert('care')}
                                >
                                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="29" height="29" rx="14.5" fill={certToggles.care ? "var(--helper-primary)" : "#B6B6B6"} />
                                                <path d="M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z" fill="white" />
                                        </svg>
                                        간병사
                                </Button>
                                {certToggles.care && (
                                        <div className="mt-2">
                                                <Input
                                                        type="text"
                                                        placeholder="자격증번호를 입력해주세요"
                                                        value={careCertNo}
                                                        onChange={(e) => setCareCertNo(e.target.value)}
                                                        className="w-full"
                                                />
                                        </div>
                                )}

                                {/* 병원동행매니저 */}
                                <Button
                                        className="flex items-center gap-2 bg-white hover:bg-white text-black border border-gray-300"
                                        onClick={() => toggleCert('nurse')}
                                >
                                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="29" height="29" rx="14.5" fill={certToggles.nurse ? "var(--helper-primary)" : "#B6B6B6"} />
                                                <path d="M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z" fill="white" />
                                        </svg>
                                        병원동행매니저
                                </Button>
                                {certToggles.nurse && (
                                        <div className="mt-2">
                                                <Input
                                                        type="text"
                                                        placeholder="자격증번호를 입력해주세요"
                                                        value={nurseCertNo}
                                                        onChange={(e) => setNurseCertNo(e.target.value)}
                                                        className="w-full"
                                                />
                                        </div>
                                )}

                                {/* 산후관리사 */}
                                <Button
                                        className="flex items-center gap-2 bg-white hover:bg-white text-black border border-gray-300"
                                        onClick={() => toggleCert('postPartum')}
                                >
                                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect width="29" height="29" rx="14.5" fill={certToggles.postPartum ? "var(--helper-primary)" : "#B6B6B6"} />
                                                <path d="M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z" fill="white" />
                                        </svg>
                                        산후관리사
                                </Button>
                                {certToggles.postPartum && (
                                        <div className="mt-2">
                                                <Input
                                                        type="text"
                                                        placeholder="자격증번호를 입력해주세요"
                                                        value={postPartumCertNo}
                                                        onChange={(e) => setPostPartumCertNo(e.target.value)}
                                                        className="w-full"
                                                />
                                        </div>
                                )}

                                {/* 기타 자격증 */}
                                <div className="flex flex-col gap-2">
                                        <Button
                                                className="flex items-center gap-2 bg-white hover:bg-white text-black border border-gray-300"
                                                onClick={() => toggleCert('other')}
                                        >
                                                <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect width="29" height="29" rx="14.5" fill={certToggles.other ? "var(--helper-primary)" : "#B6B6B6"} />
                                                        <path d="M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z" fill="white" />
                                                </svg>
                                                기타 자격증
                                        </Button>
                                        {certToggles.other && (
                                                <div className="mt-2 flex flex-col gap-2">
                                                        {/* 기존 기타 자격증 목록 */}
                                                        {helperOtherCerts.map((cert, index) => (
                                                                <div key={index} className="flex items-center gap-2">
                                                                        <Input
                                                                                type="text"
                                                                                value={cert}
                                                                                readOnly
                                                                                className="flex-1"
                                                                        />
                                                                        <Button
                                                                                onClick={() => removeHelperOtherCert(index)}
                                                                                className="bg-red-500 hover:bg-red-600 text-white"
                                                                        >
                                                                                삭제
                                                                        </Button>
                                                                </div>
                                                        ))}

                                                        {/* 새로운 기타 자격증 입력 */}
                                                        <div className="flex items-center gap-2">
                                                                <Input
                                                                        type="text"
                                                                        placeholder="기타 자격증을 입력해주세요"
                                                                        value={newOtherCert}
                                                                        onChange={(e) => setNewOtherCert(e.target.value)}
                                                                        className="flex-1"
                                                                        onKeyPress={(e) => {
                                                                                if (e.key === 'Enter') {
                                                                                        handleAddOtherCert();
                                                                                }
                                                                        }}
                                                                />
                                                                <Button
                                                                        onClick={handleAddOtherCert}
                                                                        className="bg-[var(--helper-primary)] hover:bg-[var(--helper-primary)]/90 text-white"
                                                                >
                                                                        추가
                                                                </Button>
                                                        </div>
                                                </div>
                                        )}
                                </div>






                        </div>


                        <div className="flex justify-between mt-4 ">
                                <Button
                                        onClick={handlePrev}
                                        className="bg-[var(--helper-primary)] hover:bg-[var(--helper-primary)]/90 text-white"
                                >
                                        이전
                                </Button>

                                <Button
                                        className="bg-[var(--helper-primary)] hover:bg-[var(--helper-primary)]/90 text-white"
                                        onClick={handleSignUp}
                                        disabled={!password || !name || !phone || !addressDetail || carOwnYn === null || eduYn === null || !isLicenseValid()}
                                >
                                        가입하기
                                </Button>


                        </div>


                </main>
        )
}
