"use client";
import CustomInput from "@/components/CustomInput";
import FilledButton from "@/components/FilledButton";
import Config from "@/core/config";
import Image from "next/image";
import Link from "next/link";
import { use, useState } from "react";
import { RiLoginCircleFill } from "react-icons/ri";
import { IoMdEyeOff } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { FiAlertCircle } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useAuth } from "@/core/helpers";

export default function RegisterForm() {
  const router = useRouter();
  const [obscurePassword, setObscurePassword] = useState(true);
  const [obscureconfirmPassword, setObscureconfirmPassword] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ formData, setFormData ] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toggleObscurePassword = () => {
    setObscurePassword(!obscurePassword);
  };

  const toggleObscureconfirmPassword = () => {
    setObscureconfirmPassword(!obscureconfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // console.log(formData);
      if (formData.password !== formData.confirmPassword) {
        throw new Error("password and confirm password doesn't match");
      }

      const res = await fetch(Config.baseApiUrl() + "register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      } 

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      localStorage.setItem("token", result.data.token);
      router.push("/");

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

    const user = useAuth();
    if (user) {
      window.location.href = "/";
    }

  return (
    <form className="w-full md:w-1/2 flex flex-col justify-center items-center gap-4" onSubmit={handleSubmit}>
      <Link href="/" className="flex items-center gap-2">
        <Image src="/icon.svg" alt="Logo" width={100} height={100} />
        <span className="font-poppins text-4xl font-bold">
          {Config.appName()}
        </span>
      </Link>
      <div className="h-px w-1/2 bg-dark"></div>
      <h1 className="text-2xl font-bold">Register</h1>
      {error && (
        <div className="flex items-center gap-2 text-red-500 bg-red-500/20 py-2 px-4 rounded text-sm border border-red-500 w2/3 mb-2">
          <FiAlertCircle className="shrink-0 text-lg" />
          {error}
        </div>
      )}

      <CustomInput
        type="name"
        id="name"
        name="name"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        value={formData.name}
        placeholder="Enter your username"
        required={true}
        className={"w-2/3"}
      />

      <CustomInput
        type="email"
        id="email"
        name="email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        value={formData.email}
        placeholder="Enter your email"
        required={true}
        className={"w-2/3"}
      />

      <div className="w-2/3 relative">
        <CustomInput
          type={obscurePassword ? "password" : "text"}
          id="password"
          name="password"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          value={formData.password}
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

      <div className="w-2/3 relative">
        <CustomInput
          type={obscureconfirmPassword ? "password" : "text"}
          id="password"
          name="password"
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          value={formData.confirmPassword}
          placeholder="Verified your password"
          required={true}
          className={"w-full"}
        />
        <button
          type="button"
          className="absolute top-1/2 right-4 -translate-y-1/2"
          onClick={toggleObscureconfirmPassword}
        >
          {obscureconfirmPassword ? <IoMdEye /> : <IoMdEyeOff />}
        </button>
      </div>

      <FilledButton
        type="submit"
        className={"w-2/3 disabled:bg-opacity-70"}
        disabled={loading}
      >
        {loading ? (
          <AiOutlineLoading3Quarters className="animate-spin text-xl" />
        ) : (
          <RiLoginCircleFill className="text-2xl" />
        )}
        Register
      </FilledButton>

      <p className="text-sm">
        don&apos;t have an account?{" "}
        <Link href="/login">
          <span className="font-bold text-yellow-600">Login</span>
        </Link>
      </p>
    </form>
  );
}
