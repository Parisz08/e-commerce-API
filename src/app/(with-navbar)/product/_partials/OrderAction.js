"use client";

import Config from "@/core/config";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function OrderAction({ data }) {
    const [quantity, setQuantity] = useState(1);
    const [selectedVariant, setSelectedVariant] = useState(null);
    const router = useRouter();

    const incrementQuantity = () => {
        if(quantity == data.data.stock) return;
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if(quantity == 1) return;
        setQuantity(quantity - 1);
    }
    const handleAddToCart = async () => {
        
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return router.push("/login");
            }

            const checkAuth = await fetch(Config.baseApiUrl() + "user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!checkAuth.ok) {
                localStorage.removeItem("token");
                return router.push("/login");
            }

            if (data.data.variant.length > 0 && !selectedVariant) {
                return toast.error("Please select a variant");
            }

        const res = await fetch(Config.baseApiUrl() + "Cart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                productId: data.data.id,
                variant: selectedVariant,
                quantity: quantity
            }),
        });
        const result = await res.json();    
        if (!res.ok) {
            throw new Error(result.message);
        }
        toast.success(result.message);
     } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    };

    return (
        <div className="bg-dark/20 p-5 rounded-lg">
            <p className="font-medium">stock : {data.data.stock}</p>
        <div className="flex items-center gap-4 bg-white w-fit text-xl font-medium rounded-lg overflow-hidden">
            <button className="bg-dark text-white w-10 aspect-square" onClick={decrementQuantity}>-</button>
            <input
             type="number"
             onChange={(e) =>setQuantity(Number(e.target.value))} 
             value={quantity}
             min={1}
             max={data.data.stock}
             className="w-16 text-center appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none"
             />
            <button className="bg-dark text-white w-10 aspect-square" onClick={incrementQuantity}>+</button>
        </div>
        <div className="flex gap-2 py-3">
            {data.data.variant.length > 0
             ? data.data.variant.map((variant) => (
                <button
                className={"text-lg font-medium rounded-md px-3 py-2 border-2 border-dark/20" + (selectedVariant == variant 
                    ? " bg-dark text-white" 
                    : "bg-white/70 text-black")
                }
                onClick={() => setSelectedVariant(variant)} 
                key={variant}
                >
                    {variant}
                </button>
            ))
        : null}
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3">
            <button className="bg-dark text-white text-lg font-medium px-3 py-2 rounded-md" onClick={handleAddToCart}>Add to Cart</button>
            <button className="bg-white text-black text-lg font-medium px-3 py-2 rounded-md">Buy Now</button>
        </div>
        </div>
    );
}