import AuthForm from "@/components/Auth/Authform"
const AdminLogin = () => {
    const handleSubmit = (data) => {
        // 관리자 로그인 처리
        console.log('Admin login:', data.email, data.password)
    }

    return <AuthForm type="admin" onSubmit={handleSubmit} />
}

export default AdminLogin;