"use client";

import { LayoutGroup } from "framer-motion";
import ReviewCard from "@/components/ReviewCard";
import { useRecoilValue } from "recoil";
import { reviews } from "@/states";
import { Review } from "@/types";

const ReviewCardList: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
  // const reviewList = useRecoilValue(reviews);

  return (
    <LayoutGroup>
      {reviews &&
        reviews.map((review) => {
          return <ReviewCard key={review._id} data={review} />;
        })}
    </LayoutGroup>
  );
};

export default ReviewCardList;
