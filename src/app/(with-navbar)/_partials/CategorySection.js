import CategoryCard from "@/components/CategoryCard";
import Config from "@/core/config";

export default async function CategorySection() {
    const data = await fetch(Config.baseApiUrl() + "category", {
        headers: {
            "x-api-key": process.env.API_KEY,
        }
    }).then((res) => res.json())
    // console.log(data);
    return(
    <section className="py-6">
      <h2 className="text-2xl font-bold text-center uppercase mb-4">Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-5">
        {data.data.map((category) => (
            <CategoryCard key={category.name} name={category.name} image={Config.baseUrl() + category.img_url} href={`/category/${category.name}`} />
        ))}
      </div>
      </section>
    );
}