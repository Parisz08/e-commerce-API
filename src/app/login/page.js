import Image from "next/image";
import LoginForm from "./_partials/LoginForm";


export const metadata = {
  title: "Login",
};

export default function Login() {
  return (
    <div className="flex h-screen font-poppins">
      <LoginForm />
      <Image
        src="/kim2.jpg"
        alt="Login"
        width={2400}
        height={2400}
        className="hidden md:block w-1/2 object-cover"
      />
    </div>
  );
}
