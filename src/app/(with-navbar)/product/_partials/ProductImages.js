"use client";

import Config from "@/core/config";
import Image from "next/image";
import { useState } from "react";

export default function ProductImages({ images }) {
    
    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <div>
            <Image src={Config.baseUrl() + selectedImage} width={400} height={500} alt={selectedImage} className="aspect-square w-full bg-white p-4" />
            <div className="flex gap-2 mt-2">
                {images.map((image) => (
                    <button key={image} type="button" className={"w-24 border rounded-md overflow-hidden p-1" + (image === selectedImage ? " border-dark" : "border-slate-200")}>
                        <Image 
                        src={Config.baseUrl() + image}
                        width={100}
                        height={100}
                        alt={image}
                        className="aspect-square w-full bg-white p-4 object-contain" 
                        onClick={() => setSelectedImage(image)}
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}