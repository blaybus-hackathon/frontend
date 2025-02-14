import { useState } from "react";
import { Button } from "@/components/ui/button"
export default function SignUp() {

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

    return (
        <div>
            <h1>회원가입</h1>

            <div className=" flex flex-col">


                <main className="flex-grow pt-20">
                    <div className="container mx-auto px-4 ">
                        <div className=" flex items-center justify-center">
                            <div>
                                <form className="space-y-4">

                                    {/* 동의 화면 */}
                                    <div className="flex flex-col items-start gap-2">
                                        {/* 동의 체크박스 */}
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={isAllChecked}
                                                onChange={handleAllCheck}
                                            />

                                            <span className=' text-lg font-bold'>전체 동의하기</span>
                                        </label>



                                    </div>

                                    {/* 동의 화면 */}
                                    <div className="flex flex-col items-start gap-2">
                                        {/* 동의 체크박스 */}
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={agreements.termsOfService}
                                                onChange={handleCheckboxChange('termsOfService')}
                                            />
                                            <p className="font-bold">[필수]</p>
                                            <span>이름은 모르지만 우리 서비스 약관</span>
                                        </label>
                                        <div className="w-full h-40 overflow-auto border border-gray-300 p-2 rounded">
                                            {/* 동의 화면 텍스트 */}
                                            <div className="h-full">
                                                여러분을 환영합니다.
                                                네이버 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 네이버 서비스의 이용과 관련하여 네이버 서비스를 제공하는 네이버 주식회사(이하 ‘네이버’)와 이를 이용하는 네이버 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 네이버 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.
                                            </div>
                                        </div>


                                    </div>

                                    {/* 동의 화면 */}
                                    <div className="flex flex-col items-start gap-2">
                                        {/* 동의 체크박스 */}
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={agreements.privacyPolicy}
                                                onChange={handleCheckboxChange('privacyPolicy')}
                                            />
                                            <p className="font-bold">[필수]</p>
                                            <span>개인정보 수집 및 이용</span>
                                        </label>
                                        <div className="w-full h-40 overflow-auto border border-gray-300 p-2 rounded">


                                            {/* 동의 화면 텍스트 */}
                                            <div className="h-full">
                                                개인정보보호법에 따라 네이버에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.
                                            </div>
                                        </div>

                                    </div>
                                    {/* 동의 화면 */}
                                    <div className="flex flex-col items-start gap-2">
                                        {/* 동의 체크박스 */}
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                checked={agreements.marketing}
                                                onChange={handleCheckboxChange('marketing')}
                                            />
                                            <p className="font-bold">[선택]</p>
                                            <span>개인정보 수집 및 이용</span>
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <svg
                                                className={`w-4 h-4 transition-colors ${agreements.marketing ? 'text-blue-500' : 'text-gray-300'
                                                    }`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 13l4 4L19 7"
                                                />
                                            </svg>
                                            <span className='text-sm'>이벤트・혜택 정보 수신</span>
                                        </label>



                                    </div>

                                    {/* 제출 버튼 */}
                                    <button
                                        type="submit"
                                        disabled={!isAllRequiredChecked}
                                        className={`w-full py-3 text-white ${isAllRequiredChecked ? 'bg-blue-500' : 'bg-gray-400'
                                            } rounded`}
                                    >
                                        가입하기
                                    </button>
                                </form>
                            </div>

                        </div>
                    </div>
                </main >

            </div >


        </div >
    )
}