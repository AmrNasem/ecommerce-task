import SignupForm from "@/components/signup/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Signup",
  robots: {
    index: false,
    follow: false,
  },
};

function Signup() {  
  return (
    <main className="flex items-center justify-center min-h-[calc(100dvh-62.4px)] bg-gray-50">
      <SignupForm />
    </main>
  );
}

export default Signup;
