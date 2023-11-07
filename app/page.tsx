import ReviewCard from "@/components/ReviewCard";
import { LayoutGroup } from "framer-motion";
import { Review } from "@/types";
import ReviewCardList from "@/components/ReviewCardList";


interface ReviewList extends Array<Review> {}

export default function Home() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center w-auto">
      <ReviewCardList />
    </div>
  );
}
