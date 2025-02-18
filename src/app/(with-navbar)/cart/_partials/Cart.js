"use client";
import Config from "@/core/config";
import { useAuth } from "@/core/useAuth";
import { Fragment, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { BsTrash3 } from "react-icons/bs";
import { formatCurrency } from "@/core/helpers";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Cart() {
  const [cartData, setCartData] = useState([]);
  const [selectedCart, setSelectedCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const res = await fetch(Config.baseApiUrl() + "cart", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
              Authorization: `Bearer ${token}`,
            },
          });
          const result = await res.json();
          if (!res.ok) {
            throw new Error(result.message);
          }
          console.log(result.data);
          setCartData(result.data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchCart();
  }, []);

  const deleteCart = async (cartId) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await fetch(Config.baseApiUrl() + "cart", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            cartId: cartId,
          }),
        });
        const result = await res.json();
        if (!res.ok) {
          throw new Error(result.message);
        }
        toast.success(result.message);
        setCartData(cartData.filter((item) => item.cart_id !== cartId));
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  const toggleCart = (cartId, productId, variant, quantity, price) => {
    if (selectedCart.some((cart) => cart.cartId === cartId)) {
      setSelectedCart((prevCart) =>
        prevCart.filter((cart) => cart.cartId !== cartId)
      );
      return;
    }

    setSelectedCart((prevCart) => [
      ...prevCart,
      { cartId, productId, variant, quantity, price },
    ]);
  };

  const user = useAuth();
  if (!user) return;

    const handleCheckout = () => {
      toast.success("gasin Checkout!", {
        position: "top-center",
        duration: 3000,
        style: {
          borderRadius: "8px",
          background: "#333",
          color: "#fff",
        },
      });
    };


  return (
    <Fragment>
      <h1 className="text-4xl font-bold mb-6">Cart</h1>
      <div className="flex flex-col gap-4 bg-white rounded-lg shadow p-6">
        {cartData.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          cartData.map((item) => (
            <div key={item.cart_id} className="flex items-start gap-2">
              <div
                onClick={() =>
                  toggleCart(
                    item.cart_id,
                    item.id,
                    item.variant,
                    item.quantity,
                    item.price
                  )
                }
                className={
                  "w-6 h-6 rounded border border-dark flex items-center justify-center cursor-pointer " +
                  (selectedCart.some((cart) => cart.cartId === item.cart_id)
                    ? "bg-blue-500"
                    : "bg-white")
                }
              >
                <FaCheck className={"text-2xl text-white"} />
              </div>
              <Link
                key={item.id}
                href={`/product/${item.slug}`}
                className="flex flex-row gap-3 p-6 border border-dark/30 rounded-md hover:bg-slate-50 cursor-pointer"
              >
                <Image
                  src={Config.baseUrl() + item.img_urls[0]}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="bg-white p-2 border border-dark/10 rounded-md"
                />

                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  {item.variant && (
                    <p className="text-sm">Variant: {item.variant}</p>
                  )}
                  <p className="text-sm">{formatCurrency(item.price)}</p>
                  <div>
                    <p className="text-sm">Quantity: {item.quantity}</p>
                    <p className="text-sm">
                      Total: {formatCurrency(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </Link>
              <button
                onClick={() => deleteCart(item.cart_id)}
                className="w-8 h-8 rounded bg-red-500 hover:bg-red-700 flex items-center justify-center"
              >
                <BsTrash3 className="text-2xl text-white" />
              </button>
            </div>
          ))
        )}
      </div>
      <div className="bg-white p-10 fixed bottom-0 left-0 w-full text-right shadow-lg flex items-center justify-end gap-6">
        <div>
          <p className="text-xl font-medium">Total :</p>
          <p className="font-bold text-4xl">
            {formatCurrency(
              selectedCart.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )
            )}
          </p>
        </div>
        <button
      onClick={handleCheckout}
      className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition"
    >
      Checkout
    </button>
      </div>
    </Fragment>
  );
}
