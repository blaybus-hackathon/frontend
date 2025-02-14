import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PropTypes from "prop-types";

const AuthForm = ({ type, onSubmit, setLoginType }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = e.target.elements;
        onSubmit({
            email: email.value,
            password: password.value,
        });
    }

    const AuthFormOptions = [
        "비밀번호 찾기",
        "아이디 찾기",
        "회원가입"
    ];

    return (
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>

            {/* 로그인 타입 선택 */}
            <div className="grid grid-cols-2 mb-6">
                <button
                    onClick={() => setLoginType('helper')}
                    className={`py-3 text-center border-t-2 border-l-2  ${type === 'helper'
                        ? 'bg-white border-black font-medium border-t-4 border-l-4 border-r-4'
                        : 'bg-gray-50 border-gray-200 border-b-4 border-b-black'
                        }`}
                >
                    helper
                </button>
                <button
                    onClick={() => setLoginType('company')}
                    className={`py-3 text-center border-t-2 border-r-2 ${type === 'company'
                        ? 'bg-white border-black font-medium border-t-4 border-l-4 border-r-4'
                        : 'bg-gray-50 border-gray-200 border-b-4 border-b-black'
                        }`}
                >
                    company
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    name="email"
                    type="email"
                    placeholder="아이디"
                    className="w-full"
                />
                <Input
                    name="password"
                    type="password"
                    placeholder="비밀번호"
                    className="w-full"
                />
                <Button type="submit" className="w-full">
                    로그인
                </Button>
            </form>

            <div className="flex flex-row items-center justify-center gap-4 mt-4">
                {AuthFormOptions.map((option, index) => (
                    <>
                        {index !== 0 && <p key={`separator-${index}`}>|</p>}
                        <p key={`option-${index}`}>{option}</p>
                    </>
                ))}
            </div>

        </div>



    )
}

AuthForm.propTypes = {
    type: PropTypes.oneOf(["helper", "company"]).isRequired,
    onSubmit: PropTypes.func.isRequired,
    setLoginType: PropTypes.func.isRequired,
};

export default AuthForm;