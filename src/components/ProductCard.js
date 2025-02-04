import { formatCurrency } from "@/core/helpers";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineStar } from "react-icons/md";

export default function ProductCard( {href, image, category, name, rating, price}) {
    
    return(
        <Link href={href} className="flex flex-col gap-4 bg-light text-black p-3 min-w-80 w-80">
        <Image src={image} alt={name} width={750} height={1000} className="w-full aspect-[3/4] object-cover " />
        <div className="flex flex-col  gap-1">
           <p className="text-xs font-medium bg-dark/10 py-1 px-2 rounded-lg w-fit">{category}</p>
           <h3 className="text-2xl font-bold">{name}</h3>
           { rating && (<div className="text-lg font-semibold"><MdOutlineStar className="text-yellow-500"/>{rating}</div>)}
           <p className="text-lg font-semibold">{formatCurrency(price)}</p>
        </div>
       </Link>
    );
}