import ReviewCard from "@/components/ReviewCard";
import { Review } from "@/types";

interface ReviewList extends Array<Review> {}

const list: ReviewList = [
  {
    id: 1,
    restaurant: "Il posto felice",
    rating: 3,
    longitude: 9.1203598,
    latitude: 45.4459139,
    review: "",
    address: "Via Lorenteggio, 240, 20147 Milano MI",
  },
  {
    id: 2,
    restaurant: "Macelleria Equina",
    rating: 4,
    longitude: 9.1336118,
    latitude: 45.448617,
    review: "",
    address: "Via Lorenteggio, 177, 20147 Milano MI",
  },
  {
    id: 3,
    restaurant: "Totò",
    rating: 5,
    longitude: 9.123238,
    latitude: 45.4551841,
    review: "",
    address: "Via Angelo Inganni, 83, 20147 Milano MI",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-2 justify-center items-center w-auto">
      {list.map((review) => {
        return <ReviewCard key={review.id} data={review} />;
      })}
    </div>
  );
}
