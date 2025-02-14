import AuthForm from "@/components/Auth/Authform"

const UserLogin = () => {
    const handleSubmit = (data) => {
        console.log('Admin login:', data.email, data.password)
    }

    return <AuthForm type="user" onSubmit={handleSubmit} />
}

export default UserLogin