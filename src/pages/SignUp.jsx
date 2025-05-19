import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import FirstStep from "@/components/Auth/SignUp/FirstStep";
import SecondStep from "@/components/Auth/SignUp/SecondStep";
import ThirdStep from "@/components/Auth/SignUp/ThirdStep";
export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleNext = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    // 뒤로갈 때, 특정 스텝에서만 초기화
    if (currentStep === 2) {
      setFormData((prev) => ({ ...prev, email: "" })); // 예시로 이메일 초기화
    }
    setCurrentStep(currentStep - 1);
  };

  const handleComplete = () => {
    console.log("가입 완료:", formData);
    // 여기서 백엔드에 폼 데이터 전송 등을 처리할 수 있습니다.
  };

  return (
    <main className="flex flex-col gap-4 max-w-2xl mx-auto">
      <div className="flex justify-between mb-8">
        <div
          className={`w-1/3 h-1 ${
            currentStep >= 1 ? "bg-[var(--helper-primary)]" : "bg-gray-200"
          }`}
        />
        <div
          className={`w-1/3 h-1 ${
            currentStep >= 2 ? "bg-[var(--helper-primary)]" : "bg-gray-200"
          }`}
        />
        <div
          className={`w-1/3 h-1 ${
            currentStep >= 3 ? "bg-[var(--helper-primary)]" : "bg-gray-200"
          }`}
        />
      </div>

      {currentStep === 1 && <FirstStep onNext={handleNext} />}
      {currentStep === 2 && (
        <SecondStep onNext={handleNext} onPrev={handlePrev} />
      )}
      {currentStep === 3 && (
        <ThirdStep onPrev={handlePrev} onComplete={handleComplete} />
      )}
    </main>
  );
}
