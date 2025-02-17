import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function SecondStep({ onNext, onPrev }) {
    const [isVerificationSent, setIsVerificationSent] = useState(false);

    const handleSendVerification = () => {
        setIsVerificationSent(true);
    };

    const handleNext = () => {
        onNext();
    };

    const handlePrev = () => {
        onPrev();
    };

    return (
        <main className="flex flex-col gap-4 max-w-2xl mx-auto">

            <p className="text-left font-bold">회원가입을 위해<br />이메일 인증을 진행해주세요.</p>



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
                    className='h-12'
                />

                <Button
                    onClick={handleSendVerification}
                    className='h-12 bg-[var(--helper-primary)] hover:bg-[var(--helper-primary)]/90 text-white'
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
                            placeholder="인증번호를 입력해주세요"
                            maxLength={6}
                            className='h-12'
                        />

                        <Button
                            className='h-12 bg-[var(--helper-primary)] hover:bg-[var(--helper-primary)]/90 text-white'

                        >
                            인증확인
                        </Button>
                    </div>
                    {/*타이머 또는 재발송 버튼 */}
                    <p className="text-sm text-gray-500 ">
                        인증번호 유효시간: 3:00
                    </p>
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
                    className="bg-[var(--helper-primary)] hover:bg-[var(--helper-primary)]/90 text-white"
                >
                    다음
                </Button>

            </div>

        </main>
    )
};

