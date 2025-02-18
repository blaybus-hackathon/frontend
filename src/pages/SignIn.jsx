import { useState } from "react";
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import AuthForm from "@/components/Auth/Authform"
export default function SignIn() {


    const [loginType, setLoginType] = useState("helper");

    const handleSubmit = (data) => {
        console.log('Login data:', data.email, data.password)
    }


    return (
        <>

            <div>Sign in</div>
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
