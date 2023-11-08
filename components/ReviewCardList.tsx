"use client";

import { LayoutGroup } from "framer-motion";
import ReviewCard from "@/components/ReviewCard";
import { useRecoilValue } from "recoil";
import { reviews } from "@/states";

const ReviewCardList: React.FC = () => {
  const reviewList = useRecoilValue(reviews);

  return (
    <LayoutGroup>
      {reviewList.map((review) => {
        return <ReviewCard key={review.id} data={review} />;
      })}
    </LayoutGroup>
  );
};

export default ReviewCardList;
