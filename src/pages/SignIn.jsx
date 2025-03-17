import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/Auth/Authform"
import axios from 'axios';
import useAuthStore from '@/store/suho/useAuthStore';


export default function SignIn() {

    const navigate = useNavigate();
    const [loginType, setLoginType] = useState('helper');
    const { setLoginSuccess } = useAuthStore();

    const handleSubmit = async ({ email, password }) => {
        try {
            console.log(email, password);
            const response = await axios.post(
                "http://localhost:8080/api/sign/in",
                {
                    "userId": email,
                    "userPw": password

                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200) {
                console.log('로그인 성공 ', response);
                const accessToken = response.data.accessToken;
                setLoginSuccess(accessToken);
                navigate('/');
            }
        } catch (error) {
            console.error('로그인 실패:', error);
            alert('이메일 또는 비밀번호가 올바르지 않습니다.');
        }
    };


    return (
        <>

            
            <div className="min-h-screen flex flex-col">

                <main className="flex-grow ">
                    <div className="container mx-auto px-4 ">
                        <div className="h-[800px] flex items-center justify-center">
                            <AuthForm
                                type={loginType}
                                onSubmit={handleSubmit}
                                setLoginType={setLoginType}
                            />





                        </div>
                    </div>
                </main>

            </div>


        </>
    );
}
