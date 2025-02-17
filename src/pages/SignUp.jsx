import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"

import FirstStep from "@/components/SignUp/FirstStep";
import SecondStep from "@/components/SignUp/SecondStep";
import ThirdStep from "@/components/SignUp/ThirdStep";
export default function SignUp() {

    const [currentStep, setCurrentStep] = useState(() => {
        return parseInt(localStorage.getItem('currentStep')) || 1;
    });

    useEffect(() => {
        localStorage.setItem('currentStep', currentStep);
    }, [currentStep]);

    const handleNext = () => {
        setCurrentStep(prev => prev + 1);
        console.log(currentStep);
    };

    const handlePrev = () => {
        setCurrentStep(prev => prev - 1);
    };

    const handleComplete = async () => {
        try {
            // API 호출
            // await submitSignupData(finalData);
            // 성공 시 localStorage 정리
            localStorage.removeItem('currentStep');
            // 완료 페이지로 이동 또는 다른 처리
        } catch (error) {
            // 에러 처리
        }
    };


    return (
        <main className="flex flex-col gap-4 max-w-2xl mx-auto">
            <div className="flex justify-between mb-8">
                <div className={`w-1/3 h-1 ${currentStep >= 1 ? 'bg-[var(--helper-primary)]' : 'bg-gray-200'}`} />
                <div className={`w-1/3 h-1 ${currentStep >= 2 ? 'bg-[var(--helper-primary)]' : 'bg-gray-200'}`} />
                <div className={`w-1/3 h-1 ${currentStep >= 3 ? 'bg-[var(--helper-primary)]' : 'bg-gray-200'}`} />
            </div>

            {currentStep === 1 && (
                <FirstStep onNext={handleNext} />
            )}
            {currentStep === 2 && (
                <SecondStep
                    onNext={handleNext}
                    onPrev={handlePrev}
                />
            )}
            {currentStep === 3 && (
                <ThirdStep
                    onPrev={handlePrev}
                    onComplete={handleComplete}
                />
            )}


        </main >
    )
}