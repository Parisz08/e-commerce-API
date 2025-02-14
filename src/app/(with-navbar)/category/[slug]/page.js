import ProductCard from "@/components/ProductCard";
import Config from "@/core/config";

export default async function CategoryPage({params}) {
    const slug = await params.slug;
    // console.log(slug);
    
    const data = await fetch(Config.baseApiUrl() + "Product?category=" + slug + "&sortBy=created_at&order=desc", {
        headers: {
            "x-api-key": process.env.API_KEY,
        },
        method: "GET"
    }).then((res) => res.json());

    // console.log(data);
    return (
        <section className="flex flex-col">
            <div className="bg-dark text-white p-16">
                <h1 className="text-5xl font-bold mb-4">{data.metadata.category.name}</h1>
                <p className="text-lg">{data.metadata.category.description}</p>
            </div>
            <div className="grid grid-cols-4 gap-4 p-10 bg-white place-items-center">
                {data.data.map((product) => (
                    <ProductCard
                    key={product.name}
                    href={`/product/${product.slug}`}
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