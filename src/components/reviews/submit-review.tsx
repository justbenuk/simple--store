"use client";
import { useState } from "react";
import FormButton from "../form/form-button";
import FormContainer from "../form/form-container";
import { Card } from "../ui/card";
import RatingInput from "./raiting-input";
import FormTextarea from "../form/form-textarea";
import { Button } from "../ui/button";
import { createReviewAction } from "@/actions/review-actions";
import { useUser } from "@clerk/nextjs";

export default function SubmitReview({ productId }: { productId: string }) {
  const [isReviewFormVisable, setIsReviewFormVisable] = useState(false);
  const { user } = useUser();

  return (
    <div>
      <Button
        size="lg"
        className="capitalize"
        onClick={() => setIsReviewFormVisable((prev) => !prev)}
      >
        Leave Review
      </Button>
      {isReviewFormVisable && (
        <Card className="p-8 mt-8">
          <FormContainer action={createReviewAction}>
            <input type="hidden" name="productId" value={productId} />
            <input
              type="hidden"
              name="authorName"
              value={user?.firstName || "user"}
            />
            <input
              type="hidden"
              name="authorImageUrl"
              value={user?.imageUrl || ""}
            />
            <RatingInput name="rating" />
            <FormTextarea
              name="comment"
              labelText="feedback"
              defaultValue="Outstanding Product!!!"
            />
            <FormButton className="mt-4" />
          </FormContainer>
        </Card>
      )}
    </div>
  );
}
