"use client";
import CustomInput from "@/components/CustomInput";
import FilledButton from "@/components/filledbutton";
import Config from "@/core/config";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RiLoginCircleFill } from "react-icons/ri";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";


export default function LoginForm() {
    const [obscurePassword, setObscurePassword] = useState(true);

    const toggleObscurePassword = () => {
        setObscurePassword(!obscurePassword);
    };

    return (
        <form className="w-full md:w-1/2 flex flex-col justify-center items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/icon.svg" alt="Logo" width={100} height={100} />
          <span className="font-poppins text-4xl font-bold">
            {Config.appName()}
          </span>
        </Link>
        <div className="h-px w-1/2 bg-dark"></div>
        <h1 className="text-2xl font-bold">Login</h1>

        <CustomInput
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          required={true}
          className={"w-2/3"}
        />

        <div className="w-2/3 relative">
        <CustomInput
          type={obscurePassword ? "password" : "text"}
          id="password"
          name="password"
          placeholder="Enter your password"
          required={true}
          className={"w-full"}
        />
        <button
        type="button"
        className="absolute top-1/2 right-4 -translate-y-1/2"
        onClick={toggleObscurePassword}
        >
            {obscurePassword ? <IoMdEye /> : <IoMdEyeOff />}
        </button>
        </div>

        <FilledButton
        type="submit"
        className={"w-2/3"}
        >
        Login
        <RiLoginCircleFill className="text-2xl"/>
        </FilledButton>
        <p className="text-sm">
            don&apos;t have an account?{" "}
            <Link href="/register">
           <span className="font-bold text-yellow-600">Register</span> 
            </Link>
        </p>
      </form>
    )
}