import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import useAuthStore from "@/store/suho/useAuthStore";
import axios from "axios";

export default function SecondStep({ onNext, onPrev }) {
  const [inputEmail, setInputEmail] = useState("");
  const [inputAuthNumber, setInputAuthNumber] = useState("");
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [authNumber, setAuthNumber] = useState(null);

  const { email, isVerified, setEmail, setIsVerified } = useAuthStore();

  useEffect(() => {
    if (isVerified && email) {
      setInputEmail(email);
      setIsVerificationSent(true);
    }
  }, []);

  const handleSendVerification = async () => {
    console.log(inputEmail);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/sign/authentication-mail",
        { email: inputEmail } // 로컬 상태의 이메일 사용
      );

      if (response.status === 200 && response.data) {
        setAuthNumber(Number(response.data.mailSeq));
        setIsVerificationSent(true);
      }
    } catch (error) {
      console.error("이메일 인증 요청 실패:", error);
    }
  };

  const handleVerifyNumber = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/sign/check-code",
        {
          mailSeq: authNumber, // 서버에서 받은 인증번호 시퀀스
          email: inputEmail, // 입력한 이메일
          code: inputAuthNumber, // 입력한 인증번호
        }
      );

      // 서버 응답에 따른 처리
      if (response.status === 200 && response.data) {
        setIsVerified(true);
        setEmail(inputEmail); // 인증 성공 시에만 zustand에 이메일 저장
      } else {
        // 인증 실패
        setIsVerified(false);
      }
    } catch (error) {
      console.error("인증번호 확인 실패:", error);
      setIsVerified(false);
      alert("인증 확인 중 오류가 발생했습니다.");
    }
  };

  const handleNext = () => {
    onNext();
  };

  const handlePrev = () => {
    onPrev();
  };

  return (
    <main className="flex flex-col gap-4 max-w-2xl mx-auto">
      <p className="text-left font-bold">
        회원가입을 위해
        <br />
        이메일 인증을 진행해주세요.
      </p>

      {/* 라벨 영역 */}
      <div className="flex items-center gap-2 mt-6 ">
        <span className="font-bold">이메일 입력</span>
        <span className="text-sm text-red-500">필수</span>
      </div>

      <div className="flex items-center gap-4">
        <Input
          id="email"
          type="email"
          placeholder="입력해주세요."
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
          className="h-12"
        />

        <Button
          onClick={handleSendVerification}
          className="h-12 bg-[var(--helper-primary)] hover:bg-[var(--helper-primary)]/90 text-white"
        >
          인증번호 발송
        </Button>
      </div>

      {/* 인증번호 발송 시 입력로직 */}
      {isVerificationSent && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold">인증번호 입력</span>
            <span className="text-sm text-red-500">필수</span>
          </div>
          <div className="flex gap-2">
            <Input
              type="text"
              value={inputAuthNumber}
              onChange={(e) => setInputAuthNumber(e.target.value)}
              placeholder="인증번호를 입력해주세요"
              maxLength={5}
              className="h-12"
            />

            <Button
              onClick={handleVerifyNumber}
              disabled={!inputAuthNumber} // 인증번호가 없으면 비활성화
              className="h-12 bg-[var(--helper-primary)] hover:bg-[var(--helper-primary)]/90 text-white"
            >
              인증확인
            </Button>
          </div>
        </div>
      )}

      <div className="flex justify-between ">
        <Button
          onClick={handlePrev}
          className="bg-[var(--helper-primary)] hover:bg-[var(--helper-primary)]/90 text-white"
        >
          이전
        </Button>
        <Button
          onClick={handleNext}
          disabled={!isVerified}
          className={`${
            isVerified
              ? "bg-[var(--helper-primary)] hover:bg-[var(--helper-primary)]/90"
              : "bg-gray-300"
          } text-white`}
        >
          다음
        </Button>
      </div>
    </main>
  );
}
