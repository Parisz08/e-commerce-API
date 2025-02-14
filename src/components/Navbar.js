"use client";
import Config from "@/core/config";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { useAuth } from "@/core/useAuth";


export default function Navbar() {
    const [open, setOpen] = useState(false);
    const router = useRouter(); // Initialize useRouter
    
    const toggleMenu = () => {
        setOpen(!open);
    }
    const logout = () => {
      localStorage.removeItem("token");
      router.push("/login");
  };

  const user = useAuth();

    return(
        <header className="flex justify-between items-center px-6 py-4 sticky top-0 z-30 bg-white shadow">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/icon.svg"
            alt="Logo"
            width={100}
            height={100}
            className="w-8"
          />
          <span className="font-poppins text-2xl font-bold">
            {Config.appName()}
          </span>
        </Link>
        <nav className="text-3xl flex items-center gap-3">
          <Link href="/search">
            <FaSearch />
          </Link>
          <Link href="/cart">
            <FaShoppingCart />
          </Link>
          <button onClick={toggleMenu}>
            <FaUser />
          </button>
        </nav>

        <div className={"absolute flex flex-col gap-2 bg-white shadow-lg top-20 right-4 py-4 min-w-40 rounded-md transition-all duration-200 ease-in-out origin-top-right opacity-100 " + (open ? "scale-y-100" : "scale-y-0 opacity-100") }>

        {user ? (
          <Fragment>
            <Link 
            href="/profile" 
            className="py-2 px-4 hover:bg-gray-100 text-start"
            >
            Profile
            </Link>
            <Link 
            href="/order" 
            className="py-2 px-4 hover:bg-gray-100 text-start"
            >
              My order
            </Link>
            <button 
            type="button" 
            onClick={logout} 
            className="py-2 px-4 hover:bg-gray-100 text-start"
            >
              Logout
            </button>
          </Fragment>
        ) : (
          <Fragment>
            <Link 
            href="/login" 
            className="py-2 px-4 hover:bg-gray-100 text-start"
            >
            Login
            </Link>
            <Link 
            href="/register" 
            className="py-2 px-4 hover:bg-gray-100 text-start"
            >
            Register
            </Link>
          </Fragment>
        )}

        </div>
      </header>
    )
}