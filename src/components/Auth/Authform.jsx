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
            <div className="grid grid-cols-2 mb-6 gap-4">
                <Button
                    onClick={() => setLoginType('helper')}
                    className={`hover:bg-[#F6F6F6] ${type === 'helper'
                        ? 'bg-[#522E9A] hover:bg-[#522E9A]'
                        : ''
                        }`}
                >
                    helper
                </Button>

                <Button
                    onClick={() => setLoginType('company')}
                    className={`bg-gray-300 ${type === 'company'
                        ? '  '
                        : 'hover:bg-gray-300'
                        }`}
                >
                    company
                </Button>
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