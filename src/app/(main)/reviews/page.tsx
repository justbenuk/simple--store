import {
  deleteProductReview,
  fetchProductReviewsByUser,
} from "@/actions/review-actions";
import ReviewCard from "@/components/reviews/review-card";
import Sectiontitle from "@/components/global/section-title";
import FormContainer from "@/components/form/form-container";
import { IconButton } from "@/components/products/icon-button";

export default async function ReviewsPage() {
  const reviews = await fetchProductReviewsByUser();

  if (reviews.length === 0)
    return <Sectiontitle text="you have no reviews yet" />;
  return (
    <>
      <Sectiontitle text="Your Reviews" />
      <section className="grud md:grid-cols-2 gap-8 mt-4">
        {reviews.map((review) => {
          const { comment, rating } = review;
          const { name, image } = review.product;
          const reviewIno = {
            comment,
            rating,
            name,
            image,
          };
          return (
            <ReviewCard key={review.id} reviewInfo={reviewIno}>
              <DeleteReview reviewId={review.id} />
            </ReviewCard>
          );
        })}
      </section>
    </>
  );
}

const DeleteReview = ({ reviewId }: { reviewId: string }) => {
  const deleteReview = deleteProductReview.bind(null, { reviewId });
  return (
    <FormContainer action={deleteReview}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
};
