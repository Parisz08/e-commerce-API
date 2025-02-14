import Config from "@/core/config";
import ProductImages from "../_partials/ProductImages";
import { FaStar } from "react-icons/fa";
import { formatCurrency } from "@/core/helpers";
import OrderAction from "../_partials/OrderAction";
import { Fragment } from "react";


export default async function ProductPage({params}) {
    const slug = await params.slug;

    const data = await fetch(Config.baseApiUrl() + "product/" +slug, {
        headers: {
            "x-api-key": process.env.API_KEY,
        },
        method: "GET"
    }).then((res) => res.json());
    console.log(data);

    return (
    <Fragment>
        <section className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
            <ProductImages images={data.data.img_urls} />
            <div className="space-y-2">
            <h1 className="text-4xl font-bold">{data.data.name}</h1>
            <p className="py-2 px-4 bg-dark/10 text-sm font-medium rounded w-fit">{data.data.category_name}</p>
            <div>
                {data.data.rating && (
                    <div className="flex gap-2 items-center">
                        <FaStar className="text-yellow-500" />
                        {data.data.rating} ({data.data.total_reviews} reviews)
                    </div>
                )}
                {data.data.variant.length > 0 ?  (
                    <div>
                        <p className="font-semibold mb-1">Variant :</p>
                        <div className="flex gap-2">
                            {data.data.variant.map((item) => (
                                <p key={item} className="border py-1 px-px bg-dark/10 rounded text-sm">
                                    {item}
                                </p>
                            ))}
                        </div>
                    </div>
                ) : null}
                <p className="text-3xl font-bold py-2">
                    {formatCurrency(data.data.price)}
                </p>
                <OrderAction data={data}/>
                <div className="w-full h-[1px] bg-black/50 mt-3 mb-3"></div>
                <h2 className="text-xl font-bold">Description</h2>
                <p>{data.data.description}</p>
              </div>
            </div>
        </section>
        <section className="p-10">
            <div className="flex justify-between p-10 rounded-lg bg-dark/20">
                <h2 className="text-3xl font-bold">Reviews</h2>
                 <div className="flex flex-col items-end gap-1">
                  <div className="flex gap-4 text-4xl font-bold">
                    {data.data.rating}
                    <FaStar className="text-yellow-500" />
                  </div>
                  <p>{data.data.total_reviews} reviews</p>
                 </div>
            </div>
            <div className="p-10">
                {data.data.reviews.map((review) => (
                    <div key={review.id} className="flex flex-col gap-2 p-4 border-b border-dark/30 last:border-transparent">
                        <h3 className="text-lg font-bold">{review.user_name}</h3>
                        <span>{review.created_at}</span>
                        <div className="flex gap-1 items-center">
                            {review.rating}
                        <FaStar className="text-yellow-500" />
                        </div>
                        <p>{review.comment}</p>
                    </div>
                ))}
            </div>
        </section>
    </Fragment>
    )
}