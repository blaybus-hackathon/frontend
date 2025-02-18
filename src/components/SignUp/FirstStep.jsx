import { useState } from "react";
import { Button } from "@/components/ui/button"

export default function FirstStep({ onNext }) {

    const [agreements, setAgreements] = useState({
        termsOfService: false,
        privacyPolicy: false,
        marketing: false  // 선택 동의
    });



    const [isAllChecked, setIsAllChecked] = useState(false);

    const handleAllCheck = (e) => {
        const { checked } = e.target;
        setIsAllChecked(checked);
        setAgreements({
            termsOfService: checked,
            privacyPolicy: checked,
            marketing: checked
        });
    };

    const handleCheckboxChange = (name) => (e) => {
        const { checked } = e.target;
        const newAgreements = {
            ...agreements,
            [name]: checked
        };
        setAgreements(newAgreements);

        setIsAllChecked(
            Object.values(newAgreements).every(value => value === true)
        );
    };

    const isAllRequiredChecked = agreements.termsOfService && agreements.privacyPolicy;

    const handleNext = () => {
        // 필수 약관 동의 확인
        if (agreements.termsOfService && agreements.privacyPolicy) {
            onNext();
        }
    };

    return (
        <>
            <main className="flex flex-col gap-4 max-w-2xl mx-auto">
                <div className="container mx-auto px-4 ">
                    <div className=" flex items-center justify-center">
                        <div>
                            <form className="space-y-4">

                                {/* 동의 화면 */}
                                <div className="flex flex-col items-start gap-2 border-2 border-gray-300 rounded-lg p-3">
                                    {/* 동의 체크박스 */}
                                    <label className="flex items-center gap-2">
                                        <input

                                            type="checkbox"
                                            className="hidden"
                                            checked={isAllChecked}
                                            onChange={handleAllCheck}
                                        />
                                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="29" height="29" rx="14.5" fill={isAllChecked ? "var(--helper-primary)" : "#B6B6B6"} />
                                            <path d="M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z" fill="white" />
                                        </svg>


                                        <span className=' text-lg '>전체 동의하기</span>

                                    </label>



                                </div>

                                {/* 동의 화면 */}
                                <div className="flex flex-col items-start gap-2 p-3">
                                    {/* 동의 체크박스 */}
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={agreements.termsOfService}
                                            onChange={handleCheckboxChange('termsOfService')}
                                        />
                                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="29" height="29" rx="14.5" fill={agreements.termsOfService ? "var(--helper-primary)" : "#B6B6B6"} />
                                            <path d="M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z" fill="white" />
                                        </svg>

                                        <span className="text-lg">이름은 모르지만 우리 서비스 약관</span>
                                        <p className="text-md text-red-500">필수</p>
                                    </label>
                                    <div className="w-full h-40 overflow-auto border border-gray-300 p-2 border-rounded">
                                        {/* 동의 화면 텍스트 */}
                                        <div className="h-full">
                                            여러분을 환영합니다.
                                            네이버 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 네이버 서비스의 이용과 관련하여 네이버 서비스를 제공하는 네이버 주식회사(이하 ‘네이버’)와 이를 이용하는 네이버 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 네이버 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.
                                        </div>
                                    </div>


                                </div>

                                {/* 동의 화면 */}
                                <div className="flex flex-col items-start gap-2 p-3">
                                    {/* 동의 체크박스 */}
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={agreements.privacyPolicy}
                                            onChange={handleCheckboxChange('privacyPolicy')}
                                        />
                                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="29" height="29" rx="14.5" fill={agreements.privacyPolicy ? "var(--helper-primary)" : "#B6B6B6"} />
                                            <path d="M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z" fill="white" />
                                        </svg>

                                        <span>개인정보 수집 및 이용</span>
                                        <p className="text-md text-red-500">필수</p>
                                    </label>
                                    <div className="w-full h-40 overflow-auto border border-gray-300 p-2 rounded">


                                        {/* 동의 화면 텍스트 */}
                                        <div className="h-full">
                                            개인정보보호법에 따라 네이버에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.
                                        </div>
                                    </div>

                                </div>
                                {/* 동의 화면 */}
                                <div className="flex flex-col items-start gap-2 p-3">
                                    {/* 동의 체크박스 */}
                                    <label className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={agreements.marketing}
                                            onChange={handleCheckboxChange('marketing')}
                                        />
                                        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="29" height="29" rx="14.5" fill={agreements.marketing ? "var(--helper-primary)" : "#B6B6B6"} />
                                            <path d="M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z" fill="white" />
                                        </svg>

                                        <span>이벤트 알람 동의하기</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                        <svg
                                            className={`w-4 h-4 transition-colors`}
                                            fill="none"
                                            stroke={agreements.marketing ? "var(--helper-primary)" : "#B6B6B6"}
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        <span className={`text-sm text-black}`}>이벤트・혜택 정보 수신</span>
                                    </label>



                                </div>

                                {/* 제출 버튼 */}
                                <Button
                                    onClick={handleNext}
                                    disabled={!isAllRequiredChecked}
                                    className={`w-full py-3 text-white ${isAllRequiredChecked ? 'bg-[var(--helper-primary)] hover:bg-[var(--helper-primary)]/90' : 'bg-gray-400'} rounded`}
                                >
                                    다음
                                </Button>
                            </form>
                        </div>

                    </div>
                </div>
            </main >


        </>

    )
}




