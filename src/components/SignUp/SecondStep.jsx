import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const SecondStep = () => {
    const [isVerificationSent, setIsVerificationSent] = useState(false);

    const handleSendVerification = () => {
        setIsVerificationSent(true);
    };

    return (
        <div className="flex flex-col gap-4">

                <p className="text-left font-bold">회원가입을 위해<br/>이메일 인증을 진행해주세요.</p>



            {/* 라벨 영역 */}
            <div className="flex items-center gap-2 mt-6 mb-2">
                <span className="font-bold">이메일 입력</span>
                <span className="text-sm text-red-500">필수</span>
            </div>

            <Input
                id="email"
                type="email"
                placeholder="입력해주세요."
            />

            <Button
                onClick={handleSendVerification}
            >
                인증번호 발송
            </Button>
            
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
                        />
                        <Button className="whitespace-nowrap">
                            인증확인
                        </Button>
                    </div>
                    {/* 선택적: 타이머 또는 재발송 버튼 */}
                    <p className="text-sm text-gray-500">
                        인증번호 유효시간: 3:00
                    </p>
                </div>
            )}

            <Button>
                다음
            </Button>
        </div>
    )
};

export default SecondStep;