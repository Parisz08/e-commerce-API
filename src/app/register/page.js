import Image from "next/image";
import RegisterForm from "./_partials/RegisterForm";


export const metadata = {
  title: "register",
};

export default function Register() {
  return (
    <div className="flex h-screen font-poppins">
     <Image
        src="/kim2.jpg"
        alt="Register"
        width={2400}
        height={2400}
        className="hidden md:block w-1/2 object-cover"
      />
      <RegisterForm />
    </div>
  );
}
