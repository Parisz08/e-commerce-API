import ProductCard from "@/components/ProductCard";
import Config from "@/core/config";

export default async function LatestSection() {
    const data = await fetch(Config.baseApiUrl() + "product?sortBy=created_at&order=desc", {
        headers: {
            "x-api-key": process.env.API_KEY,
        },
        method: "GET",
    }).then((res) => res.json())
    console.log(data);

    return(
        <section className="p-6 bg-dark text-white">
            <h2 className="text-4xl font-bold text-center uppercase mb-10">
                New Arrival
            </h2>
            <div className="flex gap-4 overflow-x-auto">
                {data.data.map((product) => (
                    <ProductCard 
                    key={product.name}
                    href={"`/product/${product.slug}`"}
                    image={Config.baseUrl() + product.img_urls[0]}
                    name={product.name}
                    category={product.category_name}
                    rating={product.rating}
                    price={product.price}
                    />
                ))}
            </div>
        </section>
    );
}