import { fetchProductReviews } from "@/actions/review-actions";
import ReviewCard from "./review-card";
import Sectiontitle from "../global/section-title";

export default async function ProductReviews({productId}: {productId: string}){
    const reviews = await fetchProductReviews(productId)

    return(
        <div className="mt-16">
            <Sectiontitle text="product review"/>
            <div className="grid md:grid-cols-2 gap-8 my-8">
                {reviews.map((review) => {
                    const {comment, rating, authorName, authorImageUrl} = review
                    const reviewInfo = {
                        comment, rating, image: authorImageUrl, name: authorName
                    }
                    return <ReviewCard key={review.id} reviewInfo={reviewInfo} />
                })}
            </div>
        </div>
    )
}