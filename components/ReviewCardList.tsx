"use client";

import { LayoutGroup } from "framer-motion";
import ReviewCard from "@/components/ReviewCard";
import { Review } from "@/types";
import { useSession } from "next-auth/react";

const ReviewCardList: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
  const { data: session, status } = useSession();

  return (
    <LayoutGroup>
      {reviews &&
        reviews.map((review) => {
          return (
            <ReviewCard
              key={review._id}
              data={review}
              canEditDelete={review.reviewerEmail === session?.user.email}
            />
          );
        })}
    </LayoutGroup>
  );
};

export default ReviewCardList;
