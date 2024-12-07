import { LoginForm } from "@/components/auth/login-form";
import { isUserLoggedIn } from "@/actions/auth";
import { redirect } from "next/navigation";

const Login = async () => {
    if (await isUserLoggedIn()) {
        redirect("/app");
    }

    return (
        <LoginForm />
    )
}

export default Login;
