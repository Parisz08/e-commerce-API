"use client";
import Config from "@/core/config";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { useAuth } from "@/core/useAuth";
import { toast } from "react-hot-toast";
import { MdLocationPin } from "react-icons/md";



export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [address, setAddress] = useState("Pilih alamat...");
  const [showInput, setShowInput] = useState(false);
    const router = useRouter(); // Initialize useRouter
    
    const toggleMenu = () => {
        setOpen(!open);
    }

    useEffect(() => {
      const savedAddress = localStorage.getItem("userAddress");
      if (savedAddress) {
        setAddress(savedAddress);
      }
    }, []);
  
    const handleAddressChange = (event) => {
      setAddress(event.target.value);
    };
  
    const saveAddress = () => {
      if (address.trim() === "") {
        toast.error("Alamat tidak boleh kosong!");
        return;
      }
  
      localStorage.setItem("userAddress", address);
      toast.success("Alamat berhasil diperbarui!");
      setShowInput(false);
    };

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
          <div className="relative">
      {showInput ? (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={address}
            onChange={handleAddressChange}
            className="px-2 py-1 border rounded-md"
          />
          <button
            onClick={saveAddress}
            className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
          >
            Simpan
          </button>
        </div>
      ) : (
        <p
          className="text-white cursor-pointer hover:underline"
          onClick={() => setShowInput(true)}
        >
          {address}
          <MdLocationPin className="text-red-500 cursor-pointer mb-5 text-3xl flex items-center gap-4" />
        </p>
      )}
    </div>
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