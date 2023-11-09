import ReviewCardList from "@/components/ReviewCardList";
import { InferGetServerSidePropsType } from "next";

export default function Home({
  data,
}: InferGetServerSidePropsType<GetServerSideProps>) {
  return (
    <div className="snap-y snap-mandatory grid grid-cols-1 md:grid-cols-3 gap-2 justify-items-center md:items-start items-center w-auto">
      <ReviewCardList />
    </div>
  );
}

export async function GetServerSideProps(context) {
  const res = await fetch("/api/reviews", { method: "GET" });
  const data = await res.json();
  console.log(data);
  return { props: { data } };
}
