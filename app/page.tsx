import ReviewCardList from "@/components/ReviewCardList";

export default function Home() {
  return (
    <div className="snap-y snap-mandatory grid grid-cols-1 md:grid-cols-3 gap-2 justify-items-center md:items-start items-center w-auto">
      <ReviewCardList />
    </div>
  );
}
