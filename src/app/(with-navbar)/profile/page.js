"use client";

import { useAuth } from "@/core/useAuth";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { FaUserEdit, FaSignOutAlt } from "react-icons/fa";

export default function Profile() {
  const user = useAuth();
  const router = useRouter();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-6 bg-white shadow-lg rounded-lg text-center">
          <p className="text-red-500 font-semibold">Anda belum login. Silakan masuk terlebih dahulu.</p>
          <button
            onClick={() => router.push("/login")}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-md text-center">
          <img
            src={user.avatar || "yajit.png"}
            alt="Profile Picture"
            className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-gray-300"
          />
          <h1 className="text-2xl font-semibold">{user.name || "Nama Pengguna"}</h1>
          <p className="text-gray-600">{user.email || "Email tidak tersedia"}</p>

          <div className="mt-6 flex justify-center gap-4">
            <button
              className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              onClick={() => alert("Fitur edit belum tersedia")}
            >
              <FaUserEdit className="mr-2" /> Edit Profil
            </button>

            <button
              className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              onClick={() => alert("Logout berhasil!")}
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
