import ReviewCardList from "@/components/ReviewCardList";

export const dynamic = "force-dynamic";

export default async function Home() {
  const reviews = await getAllData();
  return (
    <div className="snap-y snap-mandatory grid grid-cols-1 md:grid-cols-3 gap-2 justify-items-center md:items-start items-center w-auto">
      <ReviewCardList reviews={reviews} />
    </div>
  );
}

async function getAllData() {
  const res = await fetch("http://localhost:3000/api/reviews");
  const data = await res.json();
  console.log(data);
  return data;
}
