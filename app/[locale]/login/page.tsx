import LoginForm from "@/components/login/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  robots: {
    index: false,
    follow: false,
  },
};

function Login() {
  return (
    <main className="flex items-center justify-center min-h-[calc(100dvh-62.4px)] bg-gray-50">
      <LoginForm />      
    </main>
  );
}

export default Login;
